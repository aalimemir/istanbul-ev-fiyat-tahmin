# 🏙️ İstanbul Ev Fiyat Tahmini 

![Uygulama Ekran Görüntüsü](dashboard.png)



Bu proje, İstanbul genelindeki konut fiyatlarını makine öğrenmesi algoritmaları kullanarak tahmin eden uçtan uca (end-to-end) bir web uygulamasıdır. Kullanıcıdan alınan ilçe, mahalle, metrekare ve oda sayısı bilgilerine göre yapay zeka destekli bir fiyat analizi sunar.



🚀 **Proje Hakkında**



Proje, veri toplama aşamasından modelin canlıya alınmasına kadar olan tüm süreçleri kapsar. Model, İstanbul emlak piyasasındaki gerçek verilerle eğitilmiştir.



\- **Frontend**: Glassmorphism temalı modern arayüz (HTML5, CSS3, JavaScript).

\- **Backend**: FastAPI (Python) tabanlı yüksek performanslı API.

\- **AI Model**: XGBoost Regressor (Aşırı öğrenmeyi (overfitting) önlemek için optimize edilmiştir).

\- **Veri İşleme**: Pandas, NumPy ve Scikit-learn (StandardScaler ve Target Encoding teknikleri uygulanmıştır).



🛠️ **Kurulum ve Çalıştırma**



Projeyi yerel bilgisayarınızda çalıştırmak için şu adımları izleyin:



**1. Repoyu Klonlayın:**

&#x20;  ```bash

&#x20;  git clone \[https://github.com/KULLANICI\_ADIN/istanbul-ev-fiyat-tahmin.git](https://github.com/KULLANICI\_ADIN/istanbul-ev-fiyat-tahmin.git)

&#x20;  cd istanbul-ev-fiyat-tahmin



**2.Gerekli Kütüphaneleri Kurun:**



pip install -r requirements.txt



**3.Backend Sunucusunu Başlatın:**



&#x20;uvicorn main:app --reload



**4.Arayüzü Açın:**

index.html dosyasını tarayıcınızda açarak fiyat tahminine başlayabilirsiniz.







**Model Detayları**

Model eğitilirken şu özelliklere dikkat edilmiştir:



Konum Duyarlılığı: Mahalle bazlı fiyatlandırma için Target Encoding kullanılmıştır.



Ölçeklendirme: Metrekare gibi sayısal veriler StandardScaler ile normalize edilmiştir.



Hata Yönetimi: Frontend'den gelen verilerin model sütunlarıyla eşleşmesi için akıllı metin temizleme (Smart-Match) sistemi entegre edilmiştir.



Model:XGBoost kullanılmıştır ve %82'lik bir skorla çalışmaktadır.































