// แก้ไขฟังก์ชัน switchLanguage
function switchLanguage(lang) {
    document.documentElement.lang = lang;
    
    // ซ่อนทุกภาษาก่อน
    document.querySelectorAll('[lang]').forEach(el => {
        el.style.display = 'none';
    });
    
    // แสดงเฉพาะภาษาที่เลือก
    document.querySelectorAll(`[lang="${lang}"]`).forEach(el => {
        // จัดการกับแต่ละประเภทของ element
        if (el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'BUTTON') {
            el.style.display = 'inline-block';
        } 
        else if (el.tagName === 'LI') {
            el.style.display = 'list-item';
        }
        else {
            el.style.display = 'block';
        }
    });
    
    // บันทึกการตั้งค่าภาษาลงใน localStorage
    localStorage.setItem('selectedLanguage', lang);
}

// เพิ่มฟังก์ชันเริ่มต้นเพื่อตรวจสอบภาษาที่ควรแสดง
document.addEventListener('DOMContentLoaded', function() {
    // ตรวจสอบการตั้งค่าภาษาที่บันทึกไว้
    const savedLanguage = localStorage.getItem('selectedLanguage');
    
    if (savedLanguage) {
        // ถ้ามีการตั้งค่าภาษาที่บันทึกไว้ ให้ใช้ภาษานั้น
        switchLanguage(savedLanguage);
        
        // อัปเดตปุ่มภาษาที่เลือก
        document.querySelectorAll('.language-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === savedLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    } else {
        // ถ้าไม่มีการตั้งค่าภาษาที่บันทึกไว้ ให้ใช้ภาษาไทยเป็นค่าเริ่มต้น
        switchLanguage('th');
        
        // อัปเดตปุ่มภาษาที่เลือก
        document.querySelectorAll('.language-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === 'th') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
});

// เพิ่มการติดตั้ง event listeners สำหรับปุ่มเปลี่ยนภาษา
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.language-btn');
    
    if (langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
                
                // อัปเดตปุ่มที่เลือก
                langButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
});
