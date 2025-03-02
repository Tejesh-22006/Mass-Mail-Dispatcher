let upload = document.getElementById('upload');
upload.addEventListener('change', () => {
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function() {
        let Arr = fr.result.split(/\r?\n|\n/).map(e => {
            return e.split(',');
        });
        window.valNo = 0;
        let invalNo = 0;
        window.valMail = [];
        Arr.forEach(e => {
            let em = String(e).trim();
            if (em !== "") {
                let m = e.map(e => `<td>${e}</td>`).join('');
                let creEle = document.createElement("tr");
                creEle.innerHTML = m;
                
                if (validateEmail(em)) {
                    document.querySelector("table#val").appendChild(creEle);
                    window.valMail.push(em);
                    window.valNo += 1;
                } else {
                    document.querySelector("table#inval").appendChild(creEle);
                    invalNo += 1;
                }
            }
        });

        document.querySelector('#valCount').innerHTML = window.valNo;
        document.querySelector('#invalCount').innerHTML = invalNo;
    };
});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sendEmail() {
    let validEmails = window.valMail.join(', ');

    Email.send({
        Host: "smtp.gmail.com",
        Username: "your-email@gmail.com",
        Password: "your-password",
        To: validEmails,
        From: document.querySelector('#from').value,
        Subject: document.querySelector('#subject').value,
        Body: document.getElementById('msg').value
    }).then(
        message => {
            alert(window.valNo + " mails have been sent successfully");
            console.log("Success:", message);
        }
    ).catch(
        error => {
            alert("Failed to send emails. Please check the console for more details.");
            console.error("Error:", error);
        }
    );
}

window.addEventListener("scroll", function() {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    var scrollButton = document.getElementById("scroll-top-btn");

    if (scrollPosition > 300) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
});

document.getElementById("scroll-top-btn").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
