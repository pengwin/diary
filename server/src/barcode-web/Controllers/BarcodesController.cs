using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using BarcodeClient;

namespace barcode_web.Controllers
{
    [Route("api/barcodes/")]
    public class BarcodesController : Controller
    {
        [HttpPost("{barcode}")]
        public async Task<BarcodeClient.BarcodeInfo> Post(string barcode)
        {
            return await InfoProvider.FetchBarcode(barcode);
        }
    }
}
