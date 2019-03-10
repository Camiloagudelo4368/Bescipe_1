$(document).ready(function () {

    // calling parsley validation
    $("form[name=signInForm]").parsley();

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCbP-jTtItFgvCAAW62n6ieMTpnYlBVtOk",
        authDomain: "becipe-9368d.firebaseapp.com",
        databaseURL: "https://becipe-9368d.firebaseio.com",
        projectId: "becipe-9368d",
        storageBucket: "",
        messagingSenderId: "543729845832"
    };

    firebase.initializeApp(config);

    //Register
    $("#signIn").on("click", event => {
        event.preventDefault();

        // Validate all input fields.
        var isValid = true;
        $('input').each(function () {
            if ($(this).parsley().validate() !== true) isValid = false;
        });
        if (isValid) {

            var data = {
                // Get the user info
                email: $('#email').val(),
                password: $("#password").val(),
            };


            if (data.email != '' && data.password != '') {
                let user = null;

                //Create the user
                firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                    .then(function () {

                        $('#modalUserCreated').modal("show")
                        $('#modalUserCreated-body').text("Welcome")

                        // Set time out, after 3 seconds redirect show user created message and redirect page to the search.html
                        setTimeout(() => {
                            $('#modalUserCreated').modal("hide")
                            window.location.href = "search.html";
                        }, 3000);

                    })
                    .catch(function (error) {
                        console.log("Error:", error.message);
                        // show message on modal
                        $('#modalMessage-body').text('ERROR: ' + error.message, ['danger'])
                        $('#modalMessage').modal("show")
                    });
            }
            else {
                // show message on modal
                $('#modalMessage-body').text("Please insert all required fields")
                $('#modalMessage').modal("show")
            }
       
        }
    });
})