// แก้ไขการเปลี่ยนภาษาให้ถูกต้อง

// ฟังก์ชันเปลี่ยนภาษา
function switchLanguage(lang) {
    // ตั้งค่าภาษาให้กับ HTML
    document.documentElement.lang = lang;
    
    // ซ่อนทุกองค์ประกอบภาษา
    document.querySelectorAll('[lang]').forEach(el => {
        el.style.display = 'none';
    });
    
    // แสดงองค์ประกอบของภาษาที่เลือก
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
    
    // บันทึกภาษาที่เลือกใน localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // ป้องกันการเปลี่ยนหน้า
    return false;
}

// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    // ตรวจสอบภาษาที่บันทึกไว้
    const savedLanguage = localStorage.getItem('selectedLanguage');
    
    if (savedLanguage) {
        // ถ้ามีการบันทึกภาษาไว้ ให้ใช้ภาษานั้น
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
        // ถ้าไม่มีการบันทึกภาษาไว้ ให้ใช้ภาษาไทยเป็นค่าเริ่มต้น
        switchLanguage('th');
    }
    
    // เพิ่ม event listener ให้กับปุ่มเปลี่ยนภาษา
    const languageButtons = document.querySelectorAll('.language-btn');
    if (languageButtons.length > 0) {
        languageButtons.forEach(button => {
            // ลบ event listener เดิม (ถ้ามี) โดยสร้างคัดลอกปุ่มใหม่
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // เพิ่ม event listener ใหม่
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                
                // เปลี่ยนภาษา
                switchLanguage(lang);
                
                // อัปเดตปุ่มที่เลือก
                document.querySelectorAll('.language-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
});

// แทนที่ฟังก์ชัน switchLanguage เดิม (ถ้ามี)
window.switchLanguage = switchLanguage;
