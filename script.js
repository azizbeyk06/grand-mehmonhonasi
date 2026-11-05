const form = document.getElementById("bookingForm");
const message = document.getElementById("formMessage");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const room = document.getElementById("room");
const totalPrice = document.getElementById("totalPrice");

const roomPrices = {
    standard: 350000,
    deluxe: 550000,
    suite: 750000
};

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


// Umumiy summani hisoblash
function calculateTotal() {
    if (!checkin.value || !checkout.value) {
        totalPrice.textContent = "Umumiy summa: 0 so'm";
        return;
    }

    const start = new Date(checkin.value);
    const end = new Date(checkout.value);

    const timeDifference = end - start;
    const nights = timeDifference / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
        totalPrice.textContent = "Umumiy summa: 0 so'm";
        return;
    }

    const price = roomPrices[room.value];
    const total = price * nights;

    totalPrice.textContent =
        "Umumiy summa: " +
        total.toLocaleString("uz-UZ") +
        " so'm";
}


// Kelish sanasi
checkin.addEventListener("change", function () {
    checkout.min = checkin.value || today;

    if (checkout.value && checkout.value <= checkin.value) {
        checkout.value = "";
    }

    calculateTotal();
});


// Ketish sanasi
checkout.addEventListener("change", calculateTotal);


// Xona turi
room.addEventListener("change", calculateTotal);


// Bron qilish
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const guests = Number(document.getElementById("guests").value);

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

    calculateTotal();

    message.style.color = "#246b45";

    message.textContent =
        "Rahmat, " + name + "! Arizangiz yuborildi.";
});


// Sayt ochilganda
calculateTotal();
