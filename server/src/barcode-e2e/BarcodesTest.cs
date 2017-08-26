using System;
using System.Net;
using System.Net.Http;
using Xunit;

using Newtonsoft.Json;

namespace barcode_e2e
{

    public class BarcodesTest
    {
        [Fact]
        public void PostBarcode()
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Add("User-Agent", "xUnit test");

            var response = client.PostAsync("http://localhost:5000/api/barcodes/4607083213592", new StringContent("")).Result;

            var json = response.Content.ReadAsStringAsync().Result;

            Assert.Equal(response.StatusCode, HttpStatusCode.OK);

            var info = JsonConvert.DeserializeObject<BarcodeClient.BarcodeInfo>(json);

            Assert.Equal(info.Barcode, "4607083213592");
        }
    }
}
