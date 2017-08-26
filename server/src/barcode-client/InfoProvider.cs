using System;
using HtmlAgilityPack;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;

namespace BarcodeClient
{
    public static class InfoProvider
    {
        private static async Task<BarcodeInfo> GetBarcodeInfo(string barcode)
        {
            string url = $"http://www.goodsmatrix.ru/mobile/{barcode}.html";
            var web = new HtmlWeb();

            var htmlDoc = await web.LoadFromWebAsync(url);

            var nameNode = htmlDoc.DocumentNode.SelectSingleNode("//*[@id=\"GoodsName\"]");
            var barcodeNode = htmlDoc.DocumentNode.SelectSingleNode("//*[@id=\"BarCodeL\"]");
            var descriptionNode = htmlDoc.DocumentNode.SelectSingleNode(" //*[@id=\"Comment\"]");

            return new BarcodeInfo
            {
                Name = nameNode.InnerText,
                Barcode = barcodeNode.InnerText,
                Description = descriptionNode.InnerText,
            };
        }

        private static async Task StoreData<T>(DBEntity<T> data) where T : class
        {
            var client = new MongoClient();
            var db = client.GetDatabase("diary");
            var products = db.GetCollection<BsonDocument>("products");
            var doc = data.ToBsonDocument();
            await products.InsertOneAsync(doc);
        }

        public static async Task<BarcodeInfo> FetchBarcode(string barcode)
        {
            //4607083213592
            var info = await GetBarcodeInfo(barcode);
            var data = new DBEntity<BarcodeInfo>(info);
            await StoreData(data);
            return info;
        }
    }
}