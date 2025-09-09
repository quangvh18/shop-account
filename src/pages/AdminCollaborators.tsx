import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useAccounts } from "@/context/AccountContext";

type Collaborator = { ref: string; display_name: string; email: string; phone: string };
type CollabWithStats = Collaborator & { orders: number; totalCommission: number };

const PAGE_SIZE = 20;

const AdminCollaborators = () => {
  const { accounts } = useAccounts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [collabs, setCollabs] = useState<Collaborator[]>([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [payingRef, setPayingRef] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [historyRef, setHistoryRef] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyRows, setHistoryRows] = useState<Array<{ amount: number; created_at: string; note?: string }>>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const { data: cData, error: cErr } = await supabase
          .from("collaborators")
          .select("ref, display_name, email, phone");
        if (cErr) throw cErr;
        setCollabs((cData as any) || []);
      } catch (e: any) {
        setError("Không tải được dữ liệu cộng tác viên.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const rows: CollabWithStats[] = useMemo(() => {
    const refToTotals = new Map<string, { orders: number; total: number }>();
    for (const a of accounts) {
      if (!a.collaboratorRef) continue;
      const cur = refToTotals.get(a.collaboratorRef) || { orders: 0, total: 0 };
      cur.orders += 1;
      cur.total += Number(a.collaboratorCommission || 0);
      refToTotals.set(a.collaboratorRef, cur);
    }
    return collabs.map(c => ({
      ...c,
      orders: refToTotals.get(c.ref)?.orders || 0,
      totalCommission: refToTotals.get(c.ref)?.total || 0,
    }));
  }, [collabs, accounts]);

  const filtered = rows.filter(r => {
    const t = q.toLowerCase().trim();
    if (!t) return true;
    return (
      r.ref.toLowerCase().includes(t) ||
      (r.display_name || "").toLowerCase().includes(t) ||
      (r.email || "").toLowerCase().includes(t) ||
      (r.phone || "").toLowerCase().includes(t)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  const openPayout = (ref: string) => {
    setPayingRef(ref);
    setShowModal(true);
  };

  const currentPayoutAmount = useMemo(() => {
    if (!payingRef) return 0;
    return accounts
      .filter(a => a.collaboratorRef === payingRef)
      .reduce((s, a) => s + (Number(a.collaboratorCommission || 0)), 0);
  }, [payingRef, accounts]);

  const confirmPayout = async () => {
    if (!payingRef) return;
    setProcessing(true);
    try {
      // Ghi nhận payout
      const amount = currentPayoutAmount;
      if (amount > 0) {
        const { error: insertErr } = await supabase
          .from('payouts')
          .insert({ collaborator_ref: payingRef, amount });
        if (insertErr) throw insertErr;
      }
      const { error } = await supabase
        .from('accounts')
        .update({ collaborator_commission: 0 })
        .eq('collaborator_ref', payingRef);
      if (error) throw error;
      // Reload accounts from context to get updated data
      window.location.reload();
      setShowModal(false);
      setPayingRef(null);
    } catch (e) {
      setError('Không thể thanh toán. Vui lòng thử lại.');
    } finally {
      setProcessing(false);
    }
  };

  const openHistory = async (ref: string) => {
    setHistoryRef(ref);
    setShowHistory(true);
    setHistoryLoading(true);
    setError("");
    try {
      const { data, error } = await supabase
        .from('payouts')
        .select('amount, created_at, note')
        .eq('collaborator_ref', ref)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setHistoryRows((data as any) || []);
    } catch (e) {
      setError('Không tải được lịch sử thanh toán.');
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản trị Cộng tác viên</h1>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="h-10 border rounded-md px-3 input-focus"
            placeholder="Tìm theo ref, tên, email, SĐT"
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden bg-white">
        <div className="p-3 border-b bg-muted/20 text-sm text-muted-foreground">
          {filtered.length} cộng tác viên
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="border-b text-left">
                <th className="px-3">Ref</th>
                <th className="px-3">Tên</th>
                <th className="px-3">Email</th>
                <th className="px-3">SĐT</th>
                <th className="px-3">Số đơn</th>
                <th className="px-3">Hoa hồng</th>
                <th className="px-3">Thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="px-3 py-6 text-center text-muted-foreground" colSpan={7}>Đang tải…</td></tr>
              ) : error ? (
                <tr><td className="px-3 py-6 text-center text-red-600" colSpan={7}>{error}</td></tr>
              ) : paged.length === 0 ? (
                <tr><td className="px-3 py-6 text-center text-muted-foreground" colSpan={7}>Không có dữ liệu</td></tr>
              ) : (
                paged.map(row => (
                  <tr key={row.ref} className="border-b/60">
                    <td className="px-3 font-mono">{row.ref}</td>
                    <td className="px-3">{row.display_name || '-'}</td>
                    <td className="px-3">{row.email || '-'}</td>
                    <td className="px-3">{row.phone || '-'}</td>
                    <td className="px-3">{row.orders}</td>
                    <td className="px-3">{new Intl.NumberFormat('vi-VN').format(row.totalCommission)} đ</td>
                    <td className="px-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => openPayout(row.ref)}>Thanh toán</Button>
                        <Button variant="ghost" size="sm" onClick={() => openHistory(row.ref)}>Lịch sử</Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">Trang {page} / {totalPages}</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Trước</Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Sau</Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal tự dựng */}
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => (!processing && setShowModal(false))} />
          <div className="relative w-full max-w-md rounded-lg border bg-white p-5 shadow-xl">
            <div className="text-lg font-semibold mb-2">Xác nhận thanh toán</div>
            <div className="text-sm text-muted-foreground mb-4">
              Bạn có chắc chắn muốn thanh toán hoa hồng cho ref <span className="font-mono font-medium">{payingRef}</span>?
            </div>
            <div className="rounded-md border p-3 bg-muted/30 mb-4">
              <div className="text-sm text-muted-foreground">Số tiền sẽ thanh toán</div>
              <div className="text-xl font-semibold">{new Intl.NumberFormat('vi-VN').format(currentPayoutAmount)} đ</div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)} disabled={processing}>Hủy</Button>
              <Button onClick={confirmPayout} disabled={processing || currentPayoutAmount <= 0}>{processing ? 'Đang xử lý…' : 'Thanh toán'}</Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal lịch sử thanh toán */}
      {showHistory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowHistory(false)} />
          <div className="relative w-full max-w-lg rounded-lg border bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">Lịch sử thanh toán • Ref {historyRef}</div>
              <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>Đóng</Button>
            </div>
            {historyLoading ? (
              <div className="text-sm text-muted-foreground">Đang tải…</div>
            ) : historyRows.length === 0 ? (
              <div className="text-sm text-muted-foreground">Chưa có lịch sử</div>
            ) : (
              <div className="max-h-[60vh] overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr className="text-left">
                      <th className="px-3 py-2">Thời gian</th>
                      <th className="px-3 py-2">Số tiền</th>
                      <th className="px-3 py-2">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyRows.map((h, idx) => (
                      <tr key={idx} className="border-b/60">
                        <td className="px-3 py-2">{new Date(h.created_at).toLocaleString('vi-VN')}</td>
                        <td className="px-3 py-2">{new Intl.NumberFormat('vi-VN').format(Number(h.amount || 0))} đ</td>
                        <td className="px-3 py-2">{h.note || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminCollaborators;

