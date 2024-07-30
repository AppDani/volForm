// מחכים שהדף יטען במלואו לפני הרצת הסקריפט
document.addEventListener("DOMContentLoaded", function () {

    // שמירת הקלט של המשתמש כמשתנים
    var form = document.getElementById("volunteer-form");
    var submitBtn = document.querySelector(".sendForm");
    var confirmationMessage = document.getElementById("confirmation-message");

    var nameInput = document.getElementById("fullName");
    var phoneInput = document.getElementById("phone");
    var genderInputs = form.elements["gender"];
    var areaInputs = form.elements["area"];
    var daysInputs = form.elements["availableDays"];
    var skillsInput = document.getElementById("skills");
    var fieldsInputs = form.elements["volunteerType"];

    var images = {
        types: document.querySelectorAll(".types img"),
        days: document.querySelectorAll(".days img")
    };
    var images2 = {
        gender: document.querySelectorAll(".gender img"),
        area: document.querySelectorAll(".map img")
    };

    // פונקציה לעדכון מצב הכפתור שליחה בהתאם למילוי הטופס
    function updateSubmitButtonState() {
        // בדיקה אם שם וטלפון הוזנו
        var nameFilled = nameInput.value.length > 0;
        var phoneFilled = phoneInput.value.length > 0;

        // בדיקה אם נבחר מגדר
        var genderSelected = false;
        for (var i = 0; i < genderInputs.length; i++) {
            if (genderInputs[i].checked) {
                genderSelected = true;
                break;
            }
        }

        // בדיקה אם נבחר אזור
        var areaSelected = false;
        for (var i = 0; i < areaInputs.length; i++) {
            if (areaInputs[i].checked) {
                areaSelected = true;
                break;
            }
        }

        // בדיקה אם נבחרו ימים פנויים
        var daysSelected = false;
        for (var i = 0; i < daysInputs.length; i++) {
            if (daysInputs[i].checked) {
                daysSelected = true;
                break;
            }
        }

        // בדיקה אם נבחרו תחומים להתנדבות
        var fieldsSelected = false;
        for (var i = 0; i < fieldsInputs.length; i++) {
            if (fieldsInputs[i].checked) {
                fieldsSelected = true;
                break;
            }
        }

        // עדכון מצב הכפתור בהתאם למילוי כל השדות
        submitBtn.disabled = !(nameFilled && phoneFilled && genderSelected && areaSelected && daysSelected && fieldsSelected);
        submitBtn.style.cursor = submitBtn.disabled ? 'not-allowed' : 'pointer';
        submitBtn.style.opacity = submitBtn.disabled ? 0.5 : 1;
    }

    // פונקציה ליצירת סיכום לפי הקלט מהטופס
    function generateSummary() {
        var name = nameInput.value;
        var phone = phoneInput.value;

        // קבלת המגדר שנבחר
        var gender = "";
        for (var i = 0; i < genderInputs.length; i++) {
            if (genderInputs[i].checked) {
                gender = genderInputs[i].nextElementSibling.innerText;
                break;
            }
        }

        // קבלת האזור שנבחר
        var area = "";
        for (var i = 0; i < areaInputs.length; i++) {
            if (areaInputs[i].checked) {
                area = areaInputs[i].nextElementSibling.innerText;
                break;
            }
        }

        // קבלת הימים שנבחרו
        var selectedDays = "";
        for (var i = 0; i < daysInputs.length; i++) {
            if (daysInputs[i].checked) {
                if (selectedDays.length > 0) {
                    selectedDays += ", ";
                }
                selectedDays += daysInputs[i].nextElementSibling.innerText;
            }
        }

        // קבלת התחומים שנבחרו
        var selectedFields = "";
        for (var i = 0; i < fieldsInputs.length; i++) {
            if (fieldsInputs[i].checked) {
                if (selectedFields.length > 0) {
                    selectedFields += ", ";
                }
                selectedFields += fieldsInputs[i].nextElementSibling.innerText;
            }
        }

        // קבלת הכישורים הנוספים
        var skills = skillsInput.value;

        // החזרת הסיכום בפורמט HTML
        return `
            <div class="main-title">סיכום הבחירות שלך</div>
            שם: ${name} <br>
            טלפון: ${phone} <br>
            <div class="section-title">מגדר: ${gender}</div>
            <div class="section-title">אזור התנדבות רצוי: ${area}</div>
            <div class="section-title">סוגי התנדבות: ${selectedFields}</div>
            <div class="section-title">ימים פנויים: ${selectedDays}</div>
            <div class="section-title">כישורים נוספים: ${skills}</div>
        `;
    }

    // פונקציה לעדכון מצב התצוגה של התמונות לפי הבחירות
    function updateImages() {
        // הפחתת שקיפות של כל התמונות
        for (var key in images) {
            for (var i = 0; i < images[key].length; i++) {
                images[key][i].style.opacity = '0.2';
            }
        }
        for (var key in images2) {
            for (var i = 0; i < images2[key].length; i++) {
                images2[key][i].style.opacity = '0';
            }
        }

        // עדכון שקיפות של התמונות בהתאם לתחומים שנבחרו
        for (var i = 0; i < fieldsInputs.length; i++) {
            if (fieldsInputs[i].checked) {
                var type = fieldsInputs[i].id;
                for (var j = 0; j < images.types.length; j++) {
                    if (images.types[j].alt === type + 'Img') {
                        images.types[j].style.opacity = '1';
                    }
                }
            }
        }

        // עדכון שקיפות של התמונות בהתאם לימים שנבחרו
        for (var i = 0; i < daysInputs.length; i++) {
            var day = daysInputs[i].id;
            for (var j = 0; j < images.days.length; j++) {
                if (images.days[j].alt === day + 'Img') {
                    images.days[j].style.opacity = daysInputs[i].checked ? '1' : '0.3';
                }
            }
        }

        // עדכון שקיפות של התמונות בהתאם למגדר שנבחר
        for (var i = 0; i < genderInputs.length; i++) {
            if (genderInputs[i].checked) {
                var gender = genderInputs[i].id;
                for (var j = 0; j < images2.gender.length; j++) {
                    if (images2.gender[j].alt === gender + 'Img') {
                        images2.gender[j].style.opacity = '1';
                    } else {
                        images2.gender[j].style.opacity = '0';
                    }
                }
            }
        }

        // עדכון שקיפות של התמונות בהתאם לאזור שנבחר
        for (var i = 0; i < areaInputs.length; i++) {
            if (areaInputs[i].checked) {
                var area = areaInputs[i].id;
                for (var j = 0; j < images2.area.length; j++) {
                    if (images2.area[j].alt === area + 'Img') {
                        images2.area[j].style.opacity = '1';
                    } else {
                        images2.area[j].style.opacity = '0';
                    }
                }
            }
        }

        // עדכון שם וטלפון בזמן אמת
        document.getElementById("volunteer-name").innerText = "שם מלא: " + nameInput.value;
        document.getElementById("volunteer-phone").innerText = "טלפון נייד: " + phoneInput.value;
    }

    // הוספת מאזיני אירועים לשדות קלט לעדכון מצב כפתור השליחה ותמונות
    nameInput.addEventListener("input", function () {
        updateSubmitButtonState();
        updateImages();
    });
    phoneInput.addEventListener("input", function () {
        updateSubmitButtonState();
        updateImages();
    });

    for (var i = 0; i < genderInputs.length; i++) {
        genderInputs[i].addEventListener("change", function () {
            updateSubmitButtonState();
            updateImages();
        });
    }
    for (var i = 0; i < areaInputs.length; i++) {
        areaInputs[i].addEventListener("change", function () {
            updateSubmitButtonState();
            updateImages();
        });
    }
    for (var i = 0; i < daysInputs.length; i++) {
        daysInputs[i].addEventListener("change", function () {
            updateSubmitButtonState();
            updateImages();
        });
    }
    for (var i = 0; i < fieldsInputs.length; i++) {
        fieldsInputs[i].addEventListener("change", function () {
            updateSubmitButtonState();
            updateImages();
        });
    }
    skillsInput.addEventListener("input", updateSubmitButtonState);

    // הוספת מאזין אירועים לכפתור השליחה
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var summary = generateSummary();
        confirmationMessage.innerHTML = summary;
        confirmationMessage.classList.remove("hidden");
    });

    // קריאה ראשונית לפונקציות לעדכון מצב כפתור השליחה ותמונות
    updateSubmitButtonState();
    updateImages();
});