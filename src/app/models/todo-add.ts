export interface TodoAdd {
    content:string;
    // eklerken sadece content gönderilse yeterli çünkü diğer değerler ya veritabanında kendiliğinden set edilecek, yada iş durumu ile ilgili set edilecek propertyler.
}
