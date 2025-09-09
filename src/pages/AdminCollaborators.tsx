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
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Quản trị Cộng tác viên</h1>
      </div>

      <div className="rounded-xl border bg-white p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <input
            className="h-9 sm:h-10 border rounded-md px-3 input-focus text-sm"
            placeholder="Tìm theo ref, tên, email, SĐT"
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden bg-white">
        <div className="p-3 border-b bg-muted/20 text-xs sm:text-sm text-muted-foreground">
          {filtered.length} cộng tác viên
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-muted/40">
              <tr className="border-b text-left">
                <th className="px-2 sm:px-3 py-2">Ref</th>
                <th className="px-2 sm:px-3 py-2 hidden sm:table-cell">Tên</th>
                <th className="px-2 sm:px-3 py-2 hidden lg:table-cell">Email</th>
                <th className="px-2 sm:px-3 py-2 hidden lg:table-cell">SĐT</th>
                <th className="px-2 sm:px-3 py-2">Số đơn</th>
                <th className="px-2 sm:px-3 py-2">Hoa hồng</th>
                <th className="px-2 sm:px-3 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="px-2 sm:px-3 py-6 text-center text-muted-foreground" colSpan={7}>Đang tải…</td></tr>
              ) : error ? (
                <tr><td className="px-2 sm:px-3 py-6 text-center text-red-600" colSpan={7}>{error}</td></tr>
              ) : paged.length === 0 ? (
                <tr><td className="px-2 sm:px-3 py-6 text-center text-muted-foreground" colSpan={7}>Không có dữ liệu</td></tr>
              ) : (
                paged.map(row => (
                  <tr key={row.ref} className="border-b/60">
                    <td className="px-2 sm:px-3 py-2 font-mono text-xs">{row.ref}</td>
                    <td className="px-2 sm:px-3 py-2 hidden sm:table-cell">
                      <div className="truncate max-w-[120px]">{row.display_name || '-'}</div>
                    </td>
                    <td className="px-2 sm:px-3 py-2 hidden lg:table-cell">
                      <div className="truncate max-w-[150px]">{row.email || '-'}</div>
                    </td>
                    <td className="px-2 sm:px-3 py-2 hidden lg:table-cell">
                      <div className="truncate max-w-[100px]">{row.phone || '-'}</div>
                    </td>
                    <td className="px-2 sm:px-3 py-2 text-center">{row.orders}</td>
                    <td className="px-2 sm:px-3 py-2 text-right">
                      <div className="text-xs sm:text-sm">{new Intl.NumberFormat('vi-VN').format(row.totalCommission)} đ</div>
                    </td>
                    <td className="px-2 sm:px-3 py-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openPayout(row.ref)}
                          className="text-xs px-2 py-1 h-7"
                        >
                          <span className="hidden sm:inline">Thanh toán</span>
                          <span className="sm:hidden">💰</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openHistory(row.ref)}
                          className="text-xs px-2 py-1 h-7"
                        >
                          <span className="hidden sm:inline">Lịch sử</span>
                          <span className="sm:hidden">📋</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-3 sm:p-4 border-t">
            <div className="text-xs sm:text-sm text-muted-foreground">Trang {page} / {totalPages}</div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                className="text-xs px-2 py-1 h-7"
              >
                Trước
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                className="text-xs px-2 py-1 h-7"
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal tự dựng */}
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => (!processing && setShowModal(false))} />
          <div className="relative w-full max-w-md rounded-lg border bg-white p-4 sm:p-5 shadow-xl">
            <div className="text-base sm:text-lg font-semibold mb-2">Xác nhận thanh toán</div>
            <div className="text-xs sm:text-sm text-muted-foreground mb-4">
              Bạn có chắc chắn muốn thanh toán hoa hồng cho ref <span className="font-mono font-medium">{payingRef}</span>?
            </div>
            <div className="rounded-md border p-3 bg-muted/30 mb-4">
              <div className="text-xs sm:text-sm text-muted-foreground">Số tiền sẽ thanh toán</div>
              <div className="text-lg sm:text-xl font-semibold">{new Intl.NumberFormat('vi-VN').format(currentPayoutAmount)} đ</div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowModal(false)} 
                disabled={processing}
                className="text-xs sm:text-sm px-3 py-2"
              >
                Hủy
              </Button>
              <Button 
                onClick={confirmPayout} 
                disabled={processing || currentPayoutAmount <= 0}
                className="text-xs sm:text-sm px-3 py-2"
              >
                {processing ? 'Đang xử lý…' : 'Thanh toán'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal lịch sử thanh toán */}
      {showHistory ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowHistory(false)} />
          <div className="relative w-full max-w-lg rounded-lg border bg-white p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="text-base sm:text-lg font-semibold truncate">Lịch sử thanh toán • Ref {historyRef}</div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHistory(false)}
                className="text-xs sm:text-sm px-2 py-1 h-7"
              >
                Đóng
              </Button>
            </div>
            {historyLoading ? (
              <div className="text-xs sm:text-sm text-muted-foreground">Đang tải…</div>
            ) : historyRows.length === 0 ? (
              <div className="text-xs sm:text-sm text-muted-foreground">Chưa có lịch sử</div>
            ) : (
              <div className="max-h-[50vh] sm:max-h-[60vh] overflow-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-muted/40">
                    <tr className="text-left">
                      <th className="px-2 sm:px-3 py-2">Thời gian</th>
                      <th className="px-2 sm:px-3 py-2">Số tiền</th>
                      <th className="px-2 sm:px-3 py-2 hidden sm:table-cell">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyRows.map((h, idx) => (
                      <tr key={idx} className="border-b/60">
                        <td className="px-2 sm:px-3 py-2">
                          <div className="text-xs">{new Date(h.created_at).toLocaleDateString('vi-VN')}</div>
                          <div className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td className="px-2 sm:px-3 py-2 font-semibold">{new Intl.NumberFormat('vi-VN').format(Number(h.amount || 0))} đ</td>
                        <td className="px-2 sm:px-3 py-2 hidden sm:table-cell">{h.note || '-'}</td>
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

