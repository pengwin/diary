using System;
using System.Numerics;

namespace BarcodeClient
{
    public class BarcodeInfo
    {
        public string Name { get; set; }

        public string Barcode { get; set; }

        public string Description { get; set; }

        public override string ToString()
        {
            return $"{nameof(Name)}: {Name}, {nameof(Barcode)}: {Barcode}, {nameof(Description)}: {Description}";
        }
    }
}