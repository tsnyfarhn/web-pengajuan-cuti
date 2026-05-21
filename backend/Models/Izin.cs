public class Izin
{
    public int Id { get; set; }
    public string Jenis { get; set; } = string.Empty;
    public DateOnly TanggalIzin { get; set; }
    public DateOnly TanggalMasuk { get; set; }
}