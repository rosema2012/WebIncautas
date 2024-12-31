document.addEventListener("DOMContentLoaded", () => {
    // Cambiar entre pestañas
    const tabs = document.querySelectorAll(".tabs li");
    const sections = document.querySelectorAll(".tab-section");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active-tab"));
            tab.classList.add("active-tab");

            sections.forEach((section) =>
                section.id === tab.dataset.section
                    ? section.classList.add("active")
                    : section.classList.remove("active")
            );
        });
    });

    // Colapsar/expandir secciones
    document.querySelectorAll(".toggle-section").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const section = btn.closest(".collapsible-section");
            const body = section.querySelector(".section-body");
            body.classList.toggle("active");
            btn.textContent = body.classList.contains("active") ? "-" : "+";
        });
    });
});
