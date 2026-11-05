const form = document.getElementById("bookingForm");
const message = document.getElementById("formMessage");

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const room = document.getElementById("room");
const guests = document.getElementById("guests");
const totalPrice = document.getElementById("totalPrice");


// Xona narxlari
const roomPrices = {
    standard: 350000,
    deluxe: 550000,
    suite: 750000
};


// Bugungi sana
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


// Sanani to'g'ri hisoblash
function getDateWithoutTimezone(dateString) {
    const parts = dateString.split("-");

    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );
}


// UMUMIY SUMMANI HISOBLASH
function calculateTotal() {

    // Sana tanlanmagan bo'lsa
    if (!checkin.value || !checkout.value) {
        totalPrice.textContent = "Umumiy summa: 0 so'm";
        return;
    }


    // Sanalarni olish
    const startDate = getDateWithoutTimezone(checkin.value);
    const endDate = getDateWithoutTimezone(checkout.value);


    // Necha kecha
    const difference =
        endDate.getTime() - startDate.getTime();

    const nights =
        Math.round(difference / (1000 * 60 * 60 * 24));


    // Noto'g'ri sana
    if (nights <= 0) {
        totalPrice.textContent = "Umumiy summa: 0 so'm";
        return;
    }


    // Tanlangan xona narxi
    const pricePerNight = roomPrices[room.value];


    // Umumiy summa
    const total = pricePerNight * nights;


    // Ekranga chiqarish
    totalPrice.textContent =
        "Umumiy summa: " +
        total.toLocaleString("uz-UZ") +
        " so'm";
}


// XONA O'ZGARGANDA
room.addEventListener("change", function () {
    calculateTotal();
});


// KELISH SANASI O'ZGARGANDA
checkin.addEventListener("change", function () {

    checkout.min = checkin.value || today;

    if (
        checkout.value &&
        checkout.value <= checkin.value
    ) {
        checkout.value = "";
    }

    calculateTotal();
});


// KETISH SANASI O'ZGARGANDA
checkout.addEventListener("change", function () {
    calculateTotal();
});


// Mehmonlar soni o'zgarganda ham hisoblash
guests.addEventListener("input", function () {
    calculateTotal();
});


// BRON QILISH
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const guestNumber =
        Number(guests.value);


    if (!name || !phone) {
        message.textContent =
            "Iltimos, ism va telefon raqamini kiriting.";

        return;
    }


    if (
        !checkin.value ||
        !checkout.value ||
        checkout.value <= checkin.value
    ) {
        message.textContent =
            "Kelish va ketish sanalarini to'g'ri tanlang.";

        return;
    }


    if (
        !Number.isInteger(guestNumber) ||
        guestNumber < 1 ||
        guestNumber > 10
    ) {
        message.textContent =
            "Mehmonlar soni 1 dan 10 gacha bo'lishi kerak.";

        return;
    }


    calculateTotal();


    message.style.color = "#246b45";

    message.textContent =
        "Rahmat, " + name +
        "! Arizangiz yuborildi.";
});


// Sayt ochilganda hisoblash
calculateTotal();
