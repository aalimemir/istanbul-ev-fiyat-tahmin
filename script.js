document.getElementById('prediction-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const button = document.querySelector('.glow-button');
    const resultContainer = document.getElementById('result-container');
    const priceValue = document.getElementById('price-value');
    
    // Form verilerini al
    const formData = {
        district: document.getElementById('district').value,
        neighborhood: document.getElementById('neighborhood').value,
        net_sqm: parseInt(document.getElementById('net_sqm').value, 10),
        rooms: document.getElementById('rooms').value // Artık "2+1" gelse de sorun yok
    };
    
    // Yükleniyor durumu
    button.classList.add('loading');
    resultContainer.classList.remove('show');
    
    try {
        const response = await fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        // KRİTİK NOKTA: Python'dan dönen veriyi doğrula
        // Eğer data.price yoksa veya NaN geliyorsa 0 kabul et veya hata fırlat
        const finalPrice = (data && data.price && !isNaN(data.price)) ? data.price : null;

        if (finalPrice !== null) {
            resultContainer.classList.add('show');
            animatePrice(finalPrice, priceValue);
        } else {
            throw new Error('API geçerli bir fiyat döndürmedi.');
        }
        
    } catch (error) {
        console.error('Hata:', error);
        priceValue.textContent = "Hata!";
        priceValue.style.color = "#ef4444";
        resultContainer.classList.add('show');
    } finally {
        button.classList.remove('loading');
    }
});

function animatePrice(targetPrice, element) {
    const duration = 1500;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentPrice = Math.floor(easeProgress * targetPrice);
        
        // NaN kontrolü yaparak ekrana bas
        if (!isNaN(currentPrice)) {
            element.textContent = '₺' + new Intl.NumberFormat('tr-TR').format(currentPrice);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = '₺' + new Intl.NumberFormat('tr-TR').format(targetPrice);
        }
    }
    
    requestAnimationFrame(update);
}