document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOverlay = document.querySelector(".menu-overlay");
  const closeBtn = document.querySelector(".close-btn");

  // Mở menu overlay
  menuToggle.addEventListener("click", () => {
    menuOverlay.classList.add("active");
  });

  // Đóng menu overlay
  closeBtn.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
  });

  // Đóng menu khi click ra ngoài
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
    }
  });
});











document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  const arrowUp = document.querySelector(".arrow.up");
  const arrowDown = document.querySelector(".arrow.down");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const tags = document.querySelectorAll(".tags button");
  const fullscreenViewer = document.querySelector(".fullscreen-viewer");
  const fullscreenImg = fullscreenViewer.querySelector("img");
  const closeBtn = fullscreenViewer.querySelector(".close-btn");

  let scrollPosition = 0; // Vị trí hiện tại
  const itemHeight = galleryItems[0].offsetHeight + 10; // Chiều cao mỗi item (bao gồm margin)
  
  // Cập nhật số hàng hiển thị và tổng số hàng
  const updateRowInfo = () => {
    return {
      visibleRows: Math.floor(galleryWrapper.offsetHeight / itemHeight), // Số hàng hiển thị
      totalRows: Math.ceil(galleryItems.length / 4), // Tổng số hàng (4 cột mặc định)
    };
  };

  const { visibleRows, totalRows } = updateRowInfo();

  // Hàm cuộn gallery
  const scrollGallery = (direction) => {
    if (direction === "up" && scrollPosition > 0) {
      scrollPosition--;
    } else if (direction === "down" && scrollPosition < totalRows - visibleRows) {
      scrollPosition++;
    }
    gallery.style.transform = `translateY(-${scrollPosition * itemHeight}px)`;
  };

  // Lọc ảnh theo thẻ
  const filterGallery = (filter) => {
    galleryItems.forEach((item) => {
      item.style.display = (filter === "all" || item.dataset.tag === filter) ? "block" : "none";
    });
  };

  // Xử lý sự kiện lọc thẻ
  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const filter = tag.getAttribute("data-filter");
      tags.forEach((btn) => btn.classList.remove("active"));
      tag.classList.add("active");
      filterGallery(filter);
    });
  });

  // Sự kiện cuộn lên/xuống
  arrowUp.addEventListener("click", () => scrollGallery("up"));
  arrowDown.addEventListener("click", () => scrollGallery("down"));

  // Mở fullscreen khi nhấp vào ảnh
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      fullscreenImg.src = item.querySelector("img").src;
      fullscreenViewer.style.display = "flex";
    });
  });

  // Đóng fullscreen
  closeBtn.addEventListener("click", () => {
    fullscreenViewer.style.display = "none";
    fullscreenImg.src = ""; // Xóa ảnh khỏi chế độ fullscreen
  });
});














document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  // Hàm khởi tạo hiệu ứng thanh tiến trình
  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const skillValue = bar.getAttribute("data-skill");
      const percentText = bar.querySelector(".progress-percent");

      // Reset về trạng thái ban đầu
      bar.style.width = "0%";
      percentText.textContent = "0%";
      bar.style.transition = "none";

      // Thêm hiệu ứng tăng từ từ
      setTimeout(() => {
        bar.style.transition = "width 5s ease-in-out";
        bar.style.width = `${skillValue}%`;

        let currentPercent = 0;
        const updateInterval = 50; // Cập nhật mỗi 50ms
        const increment = skillValue / (5000 / updateInterval); // Giá trị tăng mỗi lần cập nhật

        const updatePercentage = setInterval(() => {
          currentPercent += increment;
          if (currentPercent >= skillValue) {
            currentPercent = skillValue;
            clearInterval(updatePercentage); // Dừng khi đạt đến giá trị
          }
          percentText.textContent = `${Math.round(currentPercent)}%`;
        }, updateInterval);

        // Giữ trạng thái đầy trong 4 giây
        setTimeout(() => {
          bar.style.width = `${skillValue}%`;
        }, 5000);
      }, 100); // Trễ nhỏ để đảm bảo reset hoàn tất
    });
  };

  // Lặp lại hiệu ứng mỗi 9 giây (5 giây tăng + 4 giây dừng)
  setInterval(() => {
    animateProgressBars();
  }, 9000);

  // Gọi hàm khi load trang
  animateProgressBars();
});

















// TESTIMONIAL SECTION
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-item");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  let interval;

  // Hàm hiển thị testimonial theo index
  const showTestimonial = (index) => {
    testimonials.forEach((item, idx) => {
      item.classList.remove("active");
      dots[idx].classList.remove("active");
      if (idx === index) {
        item.classList.add("active");
        dots[idx].classList.add("active");
      }
    });
  };

  // Hàm tự động chuyển testimonial
  const startAutoPlay = () => {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000); // Tự động chuyển sau 5 giây
  };

  // Khi nhấn vào nút chấm
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(interval); // Dừng interval hiện tại
      currentIndex = index; // Cập nhật index theo nút nhấn
      showTestimonial(currentIndex); // Hiển thị testimonial mới
      startAutoPlay(); // Khởi động lại interval để đồng bộ
    });
  });

  // Khởi động tự động chuyển
  startAutoPlay();
});






/**
 * =========================
 * PHẦN LIÊN HỆ (CONTACT SECTION)
 * =========================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Hiệu ứng bật ra bật vào cho icon
  const infoIcons = document.querySelectorAll(".info-icon");
  infoIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "scale(1.1)";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1)";
    });
  });

  // Hiệu ứng gõ chữ placeholder
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    const placeholder = input.getAttribute("placeholder");
    let index = 0;

    // Hàm hiệu ứng gõ chữ
    const typeEffect = () => {
      input.setAttribute("placeholder", placeholder.substring(0, index));
      index++;
      if (index > placeholder.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          index = 0;
          typingInterval = setInterval(typeEffect, 100);
        }, 4000); // Dừng 4 giây trước khi lặp lại
      }
    };

    // Khởi động hiệu ứng gõ chữ
    let typingInterval = setInterval(typeEffect, 100);

    // Khi người dùng click vào input
    input.addEventListener("focus", () => {
      clearInterval(typingInterval);
      input.setAttribute("placeholder", ""); // Xóa placeholder khi nhập
    });

    // Khi input mất focus và trống
    input.addEventListener("blur", () => {
      if (input.value === "") {
        typingInterval = setInterval(typeEffect, 100);
      }
    });
  });
});