$(document).ready(function () {

    // calling parsley validation
    $("form[name=signUpForm]").parsley();

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
    $("#signUp").on("click", event => {
        event.preventDefault();

        // Validate all input fields.
        var isValid = true;
        $('input').each(function () {
            if ($(this).parsley().validate() !== true) isValid = false;
        });
        if (isValid) {
            
            var data = {
                // Get the user info
                name: $('#name').val(),
                email: $('#email').val(),
            };
            var passwords = {
                // Get the user password
                password: $("#password").val(),
                confirmPassword: $("#confirmPassword").val(),
            }


            if (data.email != '' && passwords.password != '' && passwords.confirmPassword != '') {
                if (passwords.password == passwords.confirmPassword) {
                    let user = null;

                    //Create the user
                    firebase.auth().createUserWithEmailAndPassword(data.email, passwords.password)
                        .then(function () {
                            user = firebase.auth().currentUser;
                            // Update the user with the name
                            user.updateProfile({
                                displayName: data.name
                            })

                            $('#modalUserCreated').modal("show")
                            $('#modalUserCreated-body').text("success!!!  User created")

                            // Set time out, after 3 seconds redirect show user created message and redirect page to the search.html
                            setTimeout(() => {
                                $('#modalUserCreated').modal("hide")
                                window.location.href = "search.html";
                            }, 3000);

                        })
                        .catch(function (error) {
                            console.log("Error creating user:", error.message);
                            // show message on modal
                            $('#modalMessage-body').text('ERROR: ' + error.message, ['danger'])
                            $('#modalMessage').modal("show")
                        });
                }
                else {
                    // show message on modal
                    $('#modalMessage-body').text("password and confirm password didn't match")
                    $('#modalMessage').modal("show")

                }

            }
            else {
                // show message on modal
                $('#modalMessage-body').text("Please insert all required fields")
                $('#modalMessage').modal("show")
            }
        }
    });

})