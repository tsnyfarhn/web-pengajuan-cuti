using System.Text.Json;

public class IzinService
{
    public const int MinimumNoticeWorkingDays = 3;

    private readonly string _filePath;

    public IzinService(IWebHostEnvironment env)
    {
        _filePath = Path.Combine(env.ContentRootPath, "Data", "Izin.json");
    }

    public async Task<List<Izin>> GetAllAsync()
    {
        if (!File.Exists(_filePath))
        {
            return new List<Izin>();
        }

        var json = await File.ReadAllTextAsync(_filePath);

        return JsonSerializer.Deserialize<List<Izin>>(json) ?? new List<Izin>();
    }

    public async Task<Izin?> GetByIdAsync(int id)
    {
        var data = await GetAllAsync();

        return data.FirstOrDefault(x => x.Id == id);
    }

    public async Task<Izin> CreateAsync(Izin izin)
    {
        var data = await GetAllAsync();

        izin.Id = data.Count > 0 ? data.Max(x => x.Id) + 1 : 1;

        data.Add(izin);

        await SaveAsync(data);

        return izin;
    }

    public async Task<bool> UpdateAsync(int id, Izin izin)
    {
        var data = await GetAllAsync();

        var existingData = data.FirstOrDefault(x => x.Id == id);

        if (existingData == null)
        {
            return false;
        }

        existingData.Jenis = izin.Jenis;
        existingData.TanggalIzin = izin.TanggalIzin;
        existingData.TanggalMasuk = izin.TanggalMasuk;

        await SaveAsync(data);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var data = await GetAllAsync();

        var existingData = data.FirstOrDefault(x => x.Id == id);

        if (existingData == null)
        {
            return false;
        }

        data.Remove(existingData);

        await SaveAsync(data);

        return true;
    }

    public DateOnly GetMinimumTanggalIzin()
    {
        var today = DateOnly.FromDateTime(DateTime.Today);

        return DateHelper.AddWorkingDays(today, MinimumNoticeWorkingDays);
    }

    public string? ValidateIzin(Izin izin)
    {
        if (string.IsNullOrWhiteSpace(izin.Jenis))
        {
            return "Jenis izin wajib diisi.";
        }

        if (izin.TanggalIzin == default)
        {
            return "Tanggal izin wajib dipilih.";
        }

        if (izin.TanggalMasuk == default)
        {
            return "Tanggal masuk wajib dipilih.";
        }

        if (izin.TanggalMasuk < izin.TanggalIzin) 
        {
            return "Tanggal masuk tidak boleh lebih awal dari tanggal izin.";
        }

        var minimumTanggalIzin = GetMinimumTanggalIzin();

        if (izin.TanggalIzin < minimumTanggalIzin)
        {
            return $"Tanggal izin minimal {MinimumNoticeWorkingDays} hari kerja dari hari ini. Pilih tanggal mulai {minimumTanggalIzin:yyyy-MM-dd}.";
        }

        return null;
    }

    private async Task SaveAsync(List<Izin> data)
    {
        var options = new JsonSerializerOptions
        {
            WriteIndented = true
        };

        var json = JsonSerializer.Serialize(data, options);

        await File.WriteAllTextAsync(_filePath, json);
    }
}
