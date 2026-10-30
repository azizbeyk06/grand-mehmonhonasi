const form = document.getElementById("bookingForm");
const message = document.getElementById("formMessage");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

function getToday() {
    const date = new Date();

    date.setMinutes(
        date.getMinutes() - date.getTimezoneOffset()
    );

    return date.toISOString().split("T")[0];
}

const today = getToday();

checkin.min = today;
checkout.min = today;

checkin.addEventListener("change", function () {
    checkout.min = checkin.value || today;

    if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = "";
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const room = document.getElementById("room").value;
    const guests = Number(
        document.getElementById("guests").value
    );

    if (!name || !phone) {
        message.textContent =
            "Iltimos, ism va telefon raqamini kiriting.";

        return;
    }

    if (!checkin.value || !checkout.value ||
        checkout.value <= checkin.value) {
        message.textContent =
            "Kelish va ketish sanalarini to'g'ri tanlang.";

        return;
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
        message.textContent =
            "Mehmonlar soni 1 dan 10 gacha bo'lishi kerak.";

        return;
    }

    const roomNames = {
        standard: "Standart xona",
        deluxe: "Deluxe xona",
        suite: "Lyuks xona"
    };

    message.textContent =
        "Rahmat, " + name + "! " +
        roomNames[room] +
        " uchun ma'lumotlar tekshirildi. " +
        "Arizangiz yuborildi yuborildi.";

    message.style.color = "#246b45";
});
