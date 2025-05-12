document.addEventListener("DOMContentLoaded", () => {
    // Tunggu sedikit waktu untuk memastikan semua elemen sudah dimuat dengan benar
    setTimeout(() => {
        const sections = document.querySelectorAll(".grid-section, .editing-grid-section, .music-section");
        console.log("Jumlah elemen yang ditemukan:", sections.length);
        
        // Tambahkan CSS untuk animasi secara dinamis
        const style = document.createElement('style');
        style.textContent = `
            .grid-section, .editing-grid-section {
                transition: opacity 0.8s ease, transform 0.8s ease;
                opacity: 0;
                transform: translateY(50px);
            }
            
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .grid-item {
                transition: opacity 0.6s ease, transform 0.6s ease;
            }

            /* Tambahkan kelas untuk elemen yang telah keluar dari viewport */
            .out-of-view {
                opacity: 0;
                transform: translateY(50px);
            }
        `;
        document.head.appendChild(style);
        
        // Objek untuk melacak status setiap elemen section
        const sectionStatus = {};
        
        // Inisialisasi tracking status untuk setiap section
        sections.forEach((section, index) => {
            const id = section.className.split(' ')[0] + '-' + index;
            sectionStatus[id] = {
                visible: false,
                element: section
            };
        });
        
        // Cek apakah elemen dalam viewport
        const elementInView = (el, offset = 0) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Element visible dari atas hingga bawah viewport
            return (
                rect.top <= windowHeight - offset &&
                rect.bottom >= 0 + offset
            );
        };

        // Tampilkan section dengan efek animasi
        const displaySection = (element, id) => {
            // Hanya animasikan jika belum terlihat
            if (!sectionStatus[id].visible) {
                // Tandai section sebagai terlihat
                sectionStatus[id].visible = true;
                
                // Tambahkan visible class
                element.classList.add("visible");
                element.classList.remove("out-of-view");
                console.log("Menampilkan elemen:", element.className);
                
                // Animasikan grid-item jika ini adalah grid-section
                if (element.classList.contains('grid-section')) {
    const items = element.querySelectorAll('.grid-item');
    items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 200 + (index * 200));
    });
} else if (element.classList.contains('editing-grid-section')) {
    const items = element.querySelectorAll('.editing-grid-item');
    items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 200 + (index * 200));
    });
} else if (element.classList.contains('music-section')) {
    const items = element.querySelectorAll('.music-item');
    items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        
        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 200 + (index * 200));
    });
                }
            }
        }
        // Sembunyikan section saat keluar dari viewport
const hideSection = (element, id) => {
    if (sectionStatus[id].visible) {
        sectionStatus[id].visible = false;

        element.classList.remove("visible");
        element.classList.add("out-of-view");
        console.log("Menyembunyikan elemen:", element.className);

        // Sembunyikan grid-item untuk section ini
        if (element.classList.contains('grid-section')) {
            const items = element.querySelectorAll('.grid-item');
            items.forEach(item => {
                item.style.opacity = "0";
                item.style.transform = "translateY(50px)";
            });
        } else if (element.classList.contains('editing-grid-section')) {
            const items = element.querySelectorAll('.editing-grid-item');
            items.forEach(item => {
                item.style.opacity = "0";
                item.style.transform = "translateY(50px)";
            });
        } else if (element.classList.contains('music-section')) {
            const items = element.querySelectorAll('.music-item');
            items.forEach(item => {
                item.style.opacity = "0";
                item.style.transform = "translateY(50px)";
            });
        }
    }
};

        // Handle animasi saat scrolling
        const handleScrollAnimation = () => {
            Object.keys(sectionStatus).forEach(id => {
                const section = sectionStatus[id].element;
                
                // Cek apakah elemen dalam viewport
                if (elementInView(section, 100)) {
                    displaySection(section, id);
                } else {
                    // Jika tidak dalam viewport, reset animasi
                    hideSection(section, id);
                }
            });
        };

        // Siapkan grid-item untuk animasi
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(50px)";
            item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });
        
        // Siapkan sections untuk animasi awal
        sections.forEach(section => {
            section.classList.add("out-of-view");
        });

        // Trigger animation on page load
        handleScrollAnimation();

        // Tambahkan event listener untuk scroll
        window.addEventListener("scroll", () => {
            handleScrollAnimation();
        });
    }, 200); // Delay kecil untuk memastikan DOM sepenuhnya dimuat
});

// Tambahan animasi untuk contact.html
const hr = document.querySelector(".animated-hr");
const icons = document.querySelector(".social-icons");

if (hr && icons) {
    setTimeout(() => {
        hr.classList.add("visible");
    }, 3000); // muncul setelah paragraf terakhir selesai

    setTimeout(() => {
        icons.classList.add("visible");
    }, 4500); // ikon muncul setelah hr selesai
}
