function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // نمایش یا مخفی کردن دکمه بر اساس اسکرول
  window.onscroll = function() {
    const backToTopButton = document.getElementById("back-to-top");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
  };
  // function copyPassword() {
  //   var passwordField = document.getElementById('zip-password');
  //   passwordField.select();
  //   passwordField.setSelectionRange(0, 99999); // برای موبایل
  //   document.execCommand('copy');
  //   alert('رمز فایل زیپ کپی شد!');
  // }
  
  
  function copyPassword() {
    var passwordField = document.getElementById('zip-password');
    
    // ابتدا از API جدید clipboard استفاده می‌کنیم
    if (navigator.clipboard) {
      navigator.clipboard.writeText(passwordField.value).then(function() {
        alert('رمز فایل زیپ کپی شد!');
      }).catch(function(err) {
        console.error('خطا در کپی کردن رمز:', err);
        // اگر خطا به وقوع پیوست، از روش قدیمی استفاده می‌کنیم
        passwordField.select();
        passwordField.setSelectionRange(0, 99999); // برای موبایل
        document.execCommand('copy');
        alert('رمز فایل زیپ کپی شد!');
      });
    } else {
      // اگر navigator.clipboard پشتیبانی نمی‌کند، از روش قدیمی استفاده می‌کنیم
      passwordField.select();
      passwordField.setSelectionRange(0, 99999); // برای موبایل
      document.execCommand('copy');
      alert('رمز فایل زیپ کپی شد!');
    }
  }
  