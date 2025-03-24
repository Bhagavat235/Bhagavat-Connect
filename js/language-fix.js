// ไฟล์ JavaScript ใหม่สำหรับแก้ไขปัญหา

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    // ตั้งค่าภาษาเริ่มต้นเป็นภาษาไทย
    if (!localStorage.getItem('selectedLanguage')) {
        localStorage.setItem('selectedLanguage', 'th');
    }
    
    // ใช้ภาษาที่ถูกบันทึกไว้
    const currentLang = localStorage.getItem('selectedLanguage');
    setLanguage(currentLang);
    
    // ตั้งค่าปุ่มภาษาที่เลือก
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        
        // เพิ่ม Event Listener สำหรับการคลิกปุ่มภาษา
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // ตั้งค่าปุ่มที่เลือก
            document.querySelectorAll('.language-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // บันทึกการตั้งค่าภาษา
            localStorage.setItem('selectedLanguage', lang);
        });
    });
});

// ฟังก์ชันตั้งค่าภาษา
function setLanguage(lang) {
    // ตั้งค่าภาษาให้กับ HTML
    document.documentElement.lang = lang;
    
    // ไม่จำเป็นต้องระบุ style display เพิ่มเติมเนื่องจากจะควบคุมด้วย CSS
    console.log('Language set to: ' + lang);
}

// แทนที่ฟังก์ชัน switchLanguage เดิม (ถ้ามี)
window.switchLanguage = setLanguage;
