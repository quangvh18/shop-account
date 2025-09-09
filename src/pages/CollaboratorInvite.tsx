import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const generateRefCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const CollaboratorInvite = () => {
  const { user, sessionLoading } = useAuth();
  const [ref, setRef] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingRef, setLoadingRef] = useState(true);
  const [copied, setCopied] = useState(false);
  const [commissionTotal, setCommissionTotal] = useState<number | null>(null);

  useEffect(() => {
    if (sessionLoading || !user) return;
    (async () => {
      const { data } = await supabase
        .from("collaborators")
        .select("ref")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setRef(data.ref);
      }
      setLoadingRef(false);
    })();
  }, [sessionLoading, user]);

  // Fetch commission total when we have ref
  useEffect(() => {
    const fetchCommission = async () => {
      if (!ref) return;
      try {
        const { data, error } = await supabase
          .from('accounts')
          .select('collaborator_commission')
          .eq('collaborator_ref', ref);
        if (error) return;
        const total = (data || []).reduce((sum: number, row: any) => sum + (Number(row.collaborator_commission) || 0), 0);
        setCommissionTotal(total);
      } catch {}
    };
    fetchCommission();
  }, [ref]);

  const handleCreate = async () => {
    setError("");
    if (!user) {
      setError("Vui lòng đăng nhập.");
      return;
    }
    setSaving(true);
    let attempts = 0;
    let createdRef: string | null = null;
    while (attempts < 10 && !createdRef) {
      const candidate = generateRefCode();
      const displayName = user.email || "CTV";
      const phone = (user as any)?.user_metadata?.phone || "";
      const { error } = await supabase.from("collaborators").insert({
        user_id: user.id,
        display_name: displayName,
        email: user.email,
        phone,
        ref: candidate,
      });
      if (!error) {
        createdRef = candidate;
        break;
      }
      const message = String(error.message || "").toLowerCase();
      if (message.includes("duplicate") || message.includes("unique")) {
        attempts += 1;
        continue;
      } else {
        setError("Không thể tạo mã mời. Vui lòng thử lại sau.");
        break;
      }
    }
    setSaving(false);
    if (!createdRef) {
      setError("Không thể tạo mã mời. Vui lòng thử lại sau.");
      return;
    }
    setRef(createdRef);
  };

  const inviteLink = ref ? `${window.location.origin}/invite?ref=${ref}` : "";

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Tạo mã mời</h1>
      <Card className="shadow-soft">
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {loadingRef ? (
            <div className="h-10 w-32 bg-muted/50 rounded animate-pulse" />
          ) : ref ? (
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-muted-foreground">Link giới thiệu của bạn</div>
              <div className="rounded-lg border p-3 font-mono break-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <span className="truncate text-xs sm:text-sm">{inviteLink}</span>
                <Button
                  variant="outline"
                  onClick={async ()=>{ try { await navigator.clipboard.writeText(inviteLink); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch {} }}
                  className="text-xs sm:text-sm px-3 py-2 h-8 sm:h-9 w-full sm:w-auto"
                >
                  Copy
                </Button>
              </div>
              {copied ? <div className="text-xs text-emerald-600">Đã copy vào clipboard</div> : null}
              <div className="rounded-lg border p-3 bg-muted/30">
                <div className="text-xs sm:text-sm text-muted-foreground">Hoa hồng đã tích lũy</div>
                <div className="text-lg sm:text-xl font-semibold">{commissionTotal === null ? 'Đang tải…' : commissionTotal.toLocaleString('vi-VN') + ' đ'}</div>
              </div>
              <div className="rounded-lg border p-3 bg-amber-50 text-amber-800">
                <div className="text-xs sm:text-sm">Để nhận tiền hoa hồng, vui lòng liên hệ Zalo admin: <span className="font-semibold">0344396798</span>.</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {error ? <div className="text-xs sm:text-sm text-red-600">{error}</div> : null}
              <Button 
                onClick={handleCreate} 
                disabled={saving}
                className="w-full sm:w-auto"
              >
                {saving ? "Đang tạo..." : "Tạo mã mời"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaboratorInvite;

