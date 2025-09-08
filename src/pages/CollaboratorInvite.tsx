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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Tạo mã mời</h1>
      <Card className="shadow-soft">
        <CardContent className="p-6 space-y-6">
          {loadingRef ? (
            <div className="h-10 w-32 bg-muted/50 rounded animate-pulse" />
          ) : ref ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Link giới thiệu của bạn</div>
              <div className="rounded-lg border p-3 font-mono break-all flex items-center justify-between gap-2">
                <span className="truncate">{inviteLink}</span>
                <Button
                  variant="outline"
                  onClick={async ()=>{ try { await navigator.clipboard.writeText(inviteLink); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch {} }}
                >
                  Copy
                </Button>
              </div>
              {copied ? <div className="text-xs text-emerald-600">Đã copy vào clipboard</div> : null}
            </div>
          ) : (
            <div className="space-y-4">
              {error ? <div className="text-sm text-red-600">{error}</div> : null}
              <Button onClick={handleCreate} disabled={saving}>{saving ? "Đang tạo..." : "Tạo mã mời"}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaboratorInvite;

