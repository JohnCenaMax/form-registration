/*
 * Student Registration Form
 * Required compatibility functions:
 * - isValidStudentNumber(value)
 * - isValidPassword(value)
 */

function isValidStudentNumber(value) {
    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
    return /^(?=\S{8,}$)(?=.*[A-Z])(?=.*\d)(?=.*[$@!]).*$/.test(value);
}

// Allows the required functions to be tested by Node/CommonJS autograders.
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");
    const passwordFeedback = document.getElementById("passwordFeedback");

    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");

    function clearError(element) {
        element.textContent = "";
    }

    function validateFullName() {
        const value = fullName.value.trim();

        if (value.length < 2) {
            fullNameError.textContent = "Enter your full name with at least 2 characters.";
            return false;
        }

        clearError(fullNameError);
        return true;
    }

    function validateStudentNumber() {
        const value = studentNumber.value.trim();

        if (!isValidStudentNumber(value)) {
            studentNumberError.textContent =
                "Enter a student number in the format 24-1234-123.";
            return false;
        }

        clearError(studentNumberError);
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            emailError.textContent = "Enter a valid email address.";
            return false;
        }

        clearError(emailError);
        return true;
    }

    function validateMobileNumber() {
        const value = mobileNumber.value.trim();
        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (!mobilePattern.test(value)) {
            mobileNumberError.textContent =
                "Enter a valid mobile number: 09171234567 or +639171234567.";
            return false;
        }

        clearError(mobileNumberError);
        return true;
    }

    function validatePassword() {
        if (!isValidPassword(password.value)) {
            passwordError.textContent =
                "Password must contain at least 8 characters, one uppercase letter, one digit, and one of $, @, or !, with no spaces.";
            return false;
        }

        clearError(passwordError);
        return true;
    }

    function updatePasswordFeedback() {
        if (password.value === "") {
            passwordFeedback.textContent = "";
            passwordFeedback.className = "feedback";
            return;
        }

        if (isValidPassword(password.value)) {
            passwordFeedback.textContent = "Password meets all requirements.";
            passwordFeedback.className = "feedback valid";
        } else {
            passwordFeedback.textContent =
                "Use 8+ characters, an uppercase letter, a digit, and $, @, or !. No spaces.";
            passwordFeedback.className = "feedback invalid";
        }
    }

    function validateConfirmPassword() {
        if (confirmPassword.value !== password.value || confirmPassword.value === "") {
            confirmPasswordError.textContent = "Passwords do not match.";
            return false;
        }

        clearError(confirmPasswordError);
        return true;
    }

    function validateCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            courseError.textContent = "Select BSIT or BSCS.";
            return false;
        }

        clearError(courseError);
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            termsError.textContent = "You must agree to the terms and conditions.";
            return false;
        }

        clearError(termsError);
        return true;
    }

    function clearAllErrors() {
        fullNameError.textContent = "";
        studentNumberError.textContent = "";
        emailError.textContent = "";
        mobileNumberError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        courseError.textContent = "";
        termsError.textContent = "";
        passwordFeedback.textContent = "";
        passwordFeedback.className = "feedback";
    }

    fullName.addEventListener("blur", validateFullName);
    studentNumber.addEventListener("blur", validateStudentNumber);
    email.addEventListener("blur", validateEmail);
    mobileNumber.addEventListener("blur", validateMobileNumber);

    password.addEventListener("input", function () {
        updatePasswordFeedback();

        if (password.value !== "") {
            validatePassword();
        }
    });

    confirmPassword.addEventListener("blur", validateConfirmPassword);
    confirmPassword.addEventListener("input", function () {
        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });

    course.addEventListener("change", validateCourse);
    terms.addEventListener("change", validateTerms);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const validFullName = validateFullName();
        const validStudentNumber = validateStudentNumber();
        const validEmail = validateEmail();
        const validMobileNumber = validateMobileNumber();
        const validPassword = validatePassword();
        const validConfirmPassword = validateConfirmPassword();
        const validCourse = validateCourse();
        const validTerms = validateTerms();

        if (
            !validFullName ||
            !validStudentNumber ||
            !validEmail ||
            !validMobileNumber ||
            !validPassword ||
            !validConfirmPassword ||
            !validCourse ||
            !validTerms
        ) {
            successMessage.hidden = true;
            successMessage.textContent = "";
            registrationSummary.hidden = true;
            return;
        }

        successMessage.textContent = "Registration details validated successfully!";
        successMessage.hidden = false;

        // Display user-entered information only through textContent.
        // Passwords are intentionally never displayed.
        summaryName.textContent = fullName.value.trim();
        summaryStudentNumber.textContent = studentNumber.value.trim();
        summaryEmail.textContent = email.value.trim();
        summaryMobileNumber.textContent = mobileNumber.value.trim();
        summaryCourse.textContent = course.value;

        registrationSummary.hidden = false;
    });

    form.addEventListener("reset", function () {
        // Wait until the browser completes the native reset.
        setTimeout(function () {
            clearAllErrors();

            successMessage.textContent = "";
            successMessage.hidden = true;

            registrationSummary.hidden = true;

            summaryName.textContent = "";
            summaryStudentNumber.textContent = "";
            summaryEmail.textContent = "";
            summaryMobileNumber.textContent = "";
            summaryCourse.textContent = "";
        }, 0);
    });
});
