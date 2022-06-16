import { SPACE_ID, ACCESS_TOKEN } from "./setup/credentials.js";



const endpoint = "https://graphql.contentful.com/content/v1/spaces/" + SPACE_ID;

const query = `{
  
    microblogCollection {
      items{
        sys {
          firstPublishedAt
          id
        }
        headText
        headText2
        image {
          url
          title
          width
          height
          description
        }
        flower {
          url
          title
          width
          height
          description
        }
        gardening {
          url
          title
          width
          height
          description
        }
        link
        linkText
        number
        overview
        longText
        testimonial
        shopCollection {
          items {
            url
            title
            width
            height
            description
          }
        }
        linkBox
        linkBoxText
        location {
          lat
          lon
        }
    }
  }
}`;

const fetchOptions = {
  method: "POST",
  headers: {
    Authorization: "Bearer " + ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
};

const getMonthStringFromInt = (int) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[int];
};

const addLeadingZero = (num) => {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
};

const renderFooterDate = () => {
  const footerYearHolder = document.querySelector("[data-footer-year]");
  const timestamp = Date.now();
  const date = new Date(timestamp);
  footerYearHolder.innerText = date.getFullYear();
};

const formatPublishedDateForDateTime = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${date.getDate()}`;
};

const formatPublishedDateForDisplay = (dateString) => {
  const timestamp = Date.parse(dateString);
  const date = new Date(timestamp);
  return `${date.getDate()} ${getMonthStringFromInt(date.getMonth())} ${date.getFullYear()}`;
};

const microblogHolder = document.querySelector("[data-items]");

const itemClassNames = {
  head: "microblog__title",
  date: "item__date",
  img: "item__img",
  link: "item__link",
  panther: "item__panther",
  text: "item__text",
  num: "item__number",
  longText: "item__longText",
  flower: "item__flower",
};

const renderItems = (items) => {
  items.forEach((item) => {
    
    const newItemEl = document.createElement("article");
    newItemEl.setAttribute("id", item.sys.id);
    // newItemEl.className = "container";

    const newLayout = document.createElement("div");
    newLayout.className = "container";
    newItemEl.appendChild(newLayout);

    const newTopRow = document.createElement("div");
    newTopRow.className = "row my-5";
    newLayout.appendChild(newTopRow);

    const newBoxEl = document.createElement("div");
    newBoxEl.className = "green__box__head";
    newTopRow.appendChild(newBoxEl);

    const newSlideLeft = document.createElement("div");
    newSlideLeft.className = "col-sm-6 pr-5";
    newTopRow.appendChild(newSlideLeft);

    const newIllustEl = document.createElement("img");
      newIllustEl.src = `${item.flower.url}?w=500`;
      newIllustEl.alt = item.flower.description;
      newIllustEl.setAttribute("width", item.flower.width);
      newIllustEl.setAttribute("height", item.flower.height);
      newIllustEl.className = itemClassNames.flower;
      newSlideLeft.appendChild(newIllustEl);
    
    const newHeadEl = document.createElement("h1");
    newHeadEl.innerText = item.headText;
    newHeadEl.className = itemClassNames.head;
    newSlideLeft.appendChild(newHeadEl);

    const newOverviewEl = document.createElement("p");
    newOverviewEl.innerText = item.overview;
    newOverviewEl.className = itemClassNames.text;
    newSlideLeft.appendChild(newOverviewEl);

    const newExploreLink = document.createElement("a");
      newExploreLink.href = item.linkBox;
      newExploreLink.innerHTML = item.linkBoxText || "Explore";
      newExploreLink.setAttribute("target", "_blank");
      newExploreLink.setAttribute("rel", "noopener noreferrer");
      newExploreLink.className = "item__button";
      newSlideLeft.appendChild(newExploreLink);

    

    const newSlideRight = document.createElement("div");
    newSlideRight.className = "col-sm-6 text-right";
    newTopRow.appendChild(newSlideRight);

    const newImgEl = document.createElement("img");
      newImgEl.src = `${item.image.url}?w=500`;
      newImgEl.alt = item.image.description;
      newImgEl.setAttribute("width", item.image.width);
      newImgEl.setAttribute("height", item.image.height);
      newImgEl.className = itemClassNames.img;
      newSlideRight.appendChild(newImgEl);

      const newSecondRow = document.createElement("div");
      newSecondRow.className = "row my-5 py-5 align-items-center";
      newLayout.appendChild(newSecondRow);

      const newGardeningEl = document.createElement("img");
      newGardeningEl.src = `${item.gardening.url}?w=1920`;
      newGardeningEl.alt = item.gardening.description;
      newGardeningEl.style.width="100%";
      newSecondRow.appendChild(newGardeningEl);

      const newCenterBox = document.createElement("div");
      newCenterBox.className = "col-sm-6 mx-auto mt-5 text-center";
      newSecondRow.appendChild(newCenterBox);

      const newHeadText2 = document.createElement("h1");
      newHeadText2.innerText = item.headText2;
      newCenterBox.appendChild(newHeadText2);

      const newLongTextEl = document.createElement("p");
      newLongTextEl.innerText = item.longText;
      newCenterBox.appendChild(newLongTextEl);

      const newTestiBox = document.createElement("div");
      newTestiBox.className = "row p-5 testimonial__box";
      newItemEl.appendChild(newTestiBox);

      const newTestiEl = document.createElement("h5");
      newTestiEl.innerText = item.testimonial;
      newTestiEl.className = "col-sm-6 m-auto font-italic font-weight-light";
      newTestiBox.appendChild(newTestiEl);
      
      const newLayout2 = document.createElement("div");
      newLayout2.className = "container";
      newItemEl.appendChild(newLayout2);

      
      const newThirdRow = document.createElement("div");
      newThirdRow.className = "row my-5 align-items-center";
      newLayout2.appendChild(newThirdRow);

      const newThirdRowChild = document.createElement("div");
      newThirdRowChild.className = "col-md-6";
      newThirdRow.appendChild(newThirdRowChild);

      const newShopEl1 = document.createElement("img");
      newShopEl1.src = item.shopCollection.items[1].url;
      newShopEl1.alt = item.shopCollection.items[1].description;
      newShopEl1.className = "col-md-6 pb-3 item__shop";
      newThirdRowChild.appendChild(newShopEl1);

      const newShopEl2 = document.createElement("img");
      newShopEl2.src = item.shopCollection.items[2].url;
      newShopEl2.alt = item.shopCollection.items[2].description;
      newShopEl2.className = "col-md-6 pb-3 item__shop";
      newThirdRowChild.appendChild(newShopEl2);

      const newShopEl3 = document.createElement("img");
      newShopEl3.src = item.shopCollection.items[3].url;
      newShopEl3.alt = item.shopCollection.items[3].description;
      newShopEl3.className = "col-md-6 item__shop";
      newThirdRowChild.appendChild(newShopEl3);

      const newShopEl4 = document.createElement("img");
      newShopEl4.src = item.shopCollection.items[4].url;
      newShopEl4.alt = item.shopCollection.items[4].description;
      newShopEl4.className = "col-md-6 item__shop";
      newThirdRowChild.appendChild(newShopEl4);

      const newShopLink = document.createElement("a");
      newShopLink.href = item.link;
      newShopLink.innerHTML = "<br>\n<br>\n" + "<img src=\"assets/arrow.png\" class=\"float-left\ mx-3\">" + item.linkText || "Shop Now";
      newShopLink.setAttribute("target", "_blank");
      newShopLink.setAttribute("rel", "noopener noreferrer");
      newShopLink.className = "ml-2 item__link";
      newThirdRowChild.appendChild(newShopLink);
    
      const newShopEl = document.createElement("img");
      newShopEl.src = item.shopCollection.items[0].url;
      newShopEl.alt = item.shopCollection.items[0].description;
      newShopEl.className = "col-md-6 w-100 item__shop";
      newThirdRow.appendChild(newShopEl);
    
    





    // if (item.image) {
    //   const newImgEl = document.createElement("img");
    //   newImgEl.src = `${item.image.url}?w=500`;
    //   newImgEl.alt = item.image.description;
    //   newImgEl.setAttribute("width", item.image.width);
    //   newImgEl.setAttribute("height", item.image.height);
    //   newImgEl.className = itemClassNames.img;
    //   newSlideRight.appendChild(newImgEl);
    // }

    // if (item.text) {
    //   const newTextEl = document.createElement("h1");
    //   newTextEl.innerText = item.text;
    //   newTextEl.className = itemClassNames.text;
    //   newItemEl.appendChild(newTextEl);
    // }

    // if (item.link) {
    //   const newLinkEl = document.createElement("a");
    //   newLinkEl.href = item.link;
    //   newLinkEl.innerText = item.linkText || "View more";
    //   newLinkEl.setAttribute("target", "_blank");
    //   newLinkEl.setAttribute("rel", "noopener noreferrer");
    //   newLinkEl.className = itemClassNames.link;
    //   newItemEl.appendChild(newLinkEl);
    // }

    console.log(item.text);
    console.log(item.linkText);

    microblogHolder.appendChild(newItemEl);
  });
};




renderFooterDate();

fetch(endpoint, fetchOptions)
  .then((response) => response.json())
  .then((data) => renderItems(data.data.microblogCollection.items));
