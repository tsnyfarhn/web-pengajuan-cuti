using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IzinController : ControllerBase
{
    private readonly IzinService _izinService;

    public IzinController(IzinService izinService)
    {
        _izinService = izinService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Izin>>> GetAll()
    {
        var data = await _izinService.GetAllAsync();

        return Ok(data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Izin>> GetById(int id)
    {
        var data = await _izinService.GetByIdAsync(id);

        if (data == null)
        {
            return NotFound();
        }

        return Ok(data);
    }

    [HttpGet("minimum-tanggal")]
    public ActionResult<object> GetMinimumTanggalIzin()
    {
        return Ok(new
        {
            minimumTanggalIzin = _izinService.GetMinimumTanggalIzin(),
            minimumHariKerja = IzinService.MinimumNoticeWorkingDays
        });
    }

    [HttpPost]
    public async Task<ActionResult<Izin>> Create(Izin izin)
    {
        var validationError = _izinService.ValidateIzin(izin);

        if (validationError != null)
        {
            return BadRequest(new { message = validationError });
        }

        var createdData = await _izinService.CreateAsync(izin);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdData.Id },
            createdData
        );
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Izin izin)
    {
        var validationError = _izinService.ValidateIzin(izin);

        if (validationError != null)
        {
            return BadRequest(new { message = validationError });
        }

        var result = await _izinService.UpdateAsync(id, izin);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _izinService.DeleteAsync(id);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}
