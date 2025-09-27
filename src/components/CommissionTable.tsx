import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CommissionTable = () => {
  const commissionRates = [
    { range: "≤ 300.000đ", rate: "10%", description: "Doanh thu từ 0 - 300.000đ" },
    { range: "301.000đ - 600.000đ", rate: "15%", description: "Doanh thu từ 301.000đ - 600.000đ" },
    { range: "601.000đ - 900.000đ", rate: "20%", description: "Doanh thu từ 601.000đ - 900.000đ" },
    { range: "> 901.000đ", rate: "25%", description: "Doanh thu trên 901.000đ" },
  ];

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Bảng chia hoa hồng cộng tác viên</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {commissionRates.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
              <div className="flex-1">
                <div className="font-medium text-sm">{item.range}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary text-lg">{item.rate}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Lưu ý:</strong> Hoa hồng được tính dựa trên tổng doanh thu tích lũy của bạn. 
            Mức hoa hồng cao nhất sẽ được áp dụng cho toàn bộ doanh thu.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionTable;
