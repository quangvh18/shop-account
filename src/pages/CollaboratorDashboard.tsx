import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const generateRefCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const CollaboratorDashboard = () => {
  const { user } = useAuth();
  const [ref, setRef] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("collaborators")
        .select("ref, display_name, phone")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setRef(data.ref);
        setDisplayName(data.display_name || "");
        setPhone(data.phone || "");
      }
    })();
  }, [user]);

  const handleCreate = async () => {
    setError("");
    if (!user) return;
    if (!displayName.trim()) {
      setError("Vui lòng nhập Display name.");
      return;
    }
    if (!/^\d{9,11}$/.test(phone.trim())) {
      setError("Số điện thoại không hợp lệ (9-11 số).");
      return;
    }
    setSaving(true);
    let attempts = 0;
    let createdRef: string | null = null;
    while (attempts < 10 && !createdRef) {
      const candidate = generateRefCode();
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
      <Helmet>
        <title>Trang Cộng tác viên</title>
      </Helmet>

      <div className="text-2xl font-bold tracking-tight">Trang Cộng tác viên</div>

      <Card>
        <CardContent className="p-6 space-y-4">
          {!ref ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Display name</label>
                <input className="w-full h-10 border rounded-md px-3 input-focus" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} placeholder="Tên hiển thị" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Số điện thoại</label>
                <input className="w-full h-10 border rounded-md px-3 input-focus" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="0987..." />
              </div>
              {error ? <div className="text-sm text-red-600">{error}</div> : null}
              <Button onClick={handleCreate} disabled={saving}>{saving ? "Đang tạo..." : "Tạo mã mời"}</Button>
            </>
          ) : (
            <>
              <div className="text-sm text-muted-foreground">Link giới thiệu của bạn</div>
              <div className="rounded-lg border p-3 font-mono break-all flex items-center justify-between gap-2">
                <span className="truncate">{inviteLink}</span>
                <Button
                  variant="outline"
                  onClick={async ()=>{
                    try { await navigator.clipboard.writeText(inviteLink); } catch {}
                  }}
                >
                  Copy
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaboratorDashboard;

