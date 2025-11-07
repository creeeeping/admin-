//  제품 데이터
const product_data = [
  { category: "상의", brand: "Supreme", product: "슈프림 플레이보이 카티 티셔츠 블랙 - 25FW", price: "100,000" },
  { category: "하의", brand: "Uniqlo", product: "유니클로 X 니들스 플리스 와이드 팬츠 블랙 - KR", price: "55,000" },
  { category: "신발", brand: "Timberland", product: "팀버랜드 X 써저리 6인치 부츠 옐로우 - 와이드", price: "776,000" },
  { category: "패션잡화", brand: "Music&Goods", product: "2025 댄꼼마 짱구는 못말려 흰둥이 빅 밥그릇", price: "53,000" },
  { category: "상의", brand: "Bape", product: "베이프 퍼스트 카모 샤크 풀 집 후드 아미 그린", price: "550,000" },
  { category: "신발", brand: "Nike", product: "나이키 X 톰 삭스 마스야드 슈 3.0 스페이스캠프", price: "1,000,000" },
  { category: "상의", brand: "Stussy", product: "스투시 그래픽 후드 블랙 25FW", price: "120,000" },
  { category: "하의", brand: "Kapital", product: "캐피탈 12.5온즈 데님 멕시칸 턱시도 5P 오카길리 팬츠 인디고", price: "410,000" },
  { category: "패션잡화", brand: "Chrome Hearts", product: "크롬하츠 보넨노이슈어 2 매트 그라파이트 브러쉬드 실버", price: "2,999,000" },
  { category: "신발", brand: "New Balance", product: "뉴발란스 X JJJ자운드 992 메이드 인 USA 그레이", price: "1,490,000" },
  { category: "상의", brand: "Nike", product: "나이키 X 드레이크 녹타 푸퍼 자켓 블랙-asia", price: "1,686,000" },
  { category: "하의", brand: "Carhartt", product: "칼하트 워크 팬츠 베이지", price: "130,000" },
  { category: "상의", brand: "Palace", product: "팔라스 스포츠 밋 푸퍼 블랙 콘크리트 그레이 - 24FW", price: "479,000" },
  { category: "패션잡화", brand: "Yeezy Gap", product: "이지 캡 엔지니어드 바이 발렌시아가 플레임 캡 블랙", price: "219,000" },
  { category: "패션잡화", brand: "Supreme", product: "슈프림 X 두카티 스피디 C1 레더 글러브 레드 - 24SS", price: "550,000" },
  { category: "하의", brand: "Rick Owens", product: "릭 오웬스 포터빌 데님 더블 카고 점보 벨라스 팬츠 블랙 테라", price: "1,900,000" },
  { category: "상의", brand: "Nike", product: "슈프림 X 나이크 집업 후드 스웨트셔츠 헤더 그레이 - 25SS", price: "400,000" },
];

//  DOM 선택자
const productTable = document.getElementById("product_data_Table");
const form = document.getElementById("searchForm");
const categorySelect = document.getElementById("inlineFormSelectPref");
const searchInput = document.getElementById("searchInput");
const dateTimeEl = document.getElementById("dateTime");
const darkModeBtn = document.getElementById("darkModeBtn");
const signupBtn = document.getElementById("signupBtn");
const signupForm = document.getElementById("signupForm");
const signupSubmit = document.getElementById("signupSubmit");
const paginationEl = document.querySelector(".pagination");

//  페이지네이션 관련 변수
const itemsPerPage = 5;
let currentPage = 1;
let filteredData = [...product_data];

//  테이블 렌더링
function renderTable(data) {
  productTable.innerHTML = "";
  data.forEach((item) => {
    const row = productTable.insertRow();
    row.insertCell(0).innerText = item.category;
    row.insertCell(1).innerText = item.brand;
    row.insertCell(2).innerText = item.product;
    row.insertCell(3).innerText = item.price;
  });
}

//  페이지별 테이블 렌더링
function renderTablePage(page = 1) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = filteredData.slice(start, end);
  renderTable(paginatedData);
  renderPagination();
}

//  페이지네이션 렌더링
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  paginationEl.innerHTML = "";

  // 이전 버튼
  const prev = document.createElement("li");
  prev.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prev.innerHTML = `<a class="page-link" href="#">이전</a>`;
  prev.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTablePage(currentPage);
    }
  });
  paginationEl.appendChild(prev);

  // 페이지 번호 버튼
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${currentPage === i ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderTablePage(currentPage);
    });
    paginationEl.appendChild(li);
  }

  // 다음 버튼
  const next = document.createElement("li");
  next.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  next.innerHTML = `<a class="page-link" href="#">다음</a>`;
  next.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTablePage(currentPage);
    }
  });
  paginationEl.appendChild(next);
}

//  검색 기능
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = categorySelect.value;
  const keyword = searchInput.value.trim();
  filteredData = product_data.filter((item) => {
    const matchCategory = category ? item.category === category : true;
    const matchKeyword = keyword ? item.product.includes(keyword) : true;
    return matchCategory && matchKeyword;
  });
  currentPage = 1;
  renderTablePage(currentPage);
});

//  현재 시간 표시
function updateTime() {
  const now = new Date();
  const formatted = now.toLocaleString("ko-KR");
  dateTimeEl.textContent = formatted;
}
setInterval(updateTime, 1000);
updateTime();

//  다크모드
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeBtn.textContent = document.body.classList.contains("dark-mode")
    ? "라이트모드"
    : "다크모드";
});

// 회원가입 폼 열기/닫기
signupBtn.addEventListener("click", () => {
  signupForm.style.display =
    signupForm.style.display === "block" ? "none" : "block";
});

//  회원가입 alert
signupSubmit.addEventListener("click", () => {
  const id = document.getElementById("signupId").value.trim();
  const pw = document.getElementById("signupPw").value.trim();
  const pwCheck = document.getElementById("signupPwCheck").value.trim();
  const name = document.getElementById("signupName").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();
  const email = document.getElementById("signupEmail").value.trim();

  if (!id || !pw || !pwCheck || !name || !phone || !email) {
    alert("모든 항목을 입력해주세요.");
    return;
  }
  if (pw !== pwCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  alert(` 회원가입 완료!\n\n아이디: ${id}\n이름: ${name}\n이메일: ${email}`);
  signupForm.style.display = "none";
});

//  초기 렌더링
renderTablePage();
