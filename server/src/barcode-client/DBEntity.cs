using System;
using MongoDB.Bson;

namespace BarcodeClient
{
    internal class DBEntity<T> where T: class
    {
        public T Data { get; set; }

        public DateTime CreatedUtc {get; set; }

        public DBEntity() {}

        public DBEntity(T data)
        {
            Data = data;
            CreatedUtc = DateTime.UtcNow;
        }

    }
}