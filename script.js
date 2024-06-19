function openTab(tabName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }
    document.getElementById(tabName).classList.add('active');
}

function createSnowflakes(num) {
    const body = document.body;
    for (let i = 0; i < num; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.width = `${Math.random() * 10 + 5}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.opacity = Math.random(); 
        body.appendChild(snowflake);
    }
}

function showContent() {
    document.getElementById('loader-wrapper').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

window.onload = function() {
    createSnowflakes(100);

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");
        const date = new Date();
        const timestamp = date.toLocaleString();

        const embedData = {
            embeds: [
                {
                    title: "New Contact Form Submission",
                    color: 16777215, // White
                    fields: [
                        {
                            name: "Name",
                            value: name,
                            inline: true
                        },
                        {
                            name: "Email",
                            value: email,
                            inline: true
                        },
                        {
                            name: "Message",
                            value: message
                        },
                        {
                            name: "Timestamp",
                            value: timestamp
                        }
                    ]
                }
            ]
        };

        fetch("https://discord.com/api/webhooks/1252805200893313085/Y2fa370TRe_44qR9cTqmF9KYzfgyhTFg8hyqTV9G4M0MQD32CpmsjrYQt2qq4wmhLE7I", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(embedData)
        })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
                form.reset();
            } else {
                throw new Error("Network response was not ok.");
            }
        })
        .catch(error => {
            console.error("There was a problem with the form submission:", error.message);
        });
    });

    // Simulate loading process
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        document.getElementById('progress-label').innerText = `Loading... ${progress}%`;
        if (progress >= 100) {
            clearInterval(progressInterval);
            showContent();
        }
    }, 200);
};
