const data = {
  headerText: "Welcome to your interview with The Home Depot!",
  // idea: different image aspect ratios style
  products: [
    {
      image: "https://bit.ly/3nO7K91",
      price: 50,
      description: "Rug in Black",
      brand: "Home",
      link: "",
      swatchUrl: "https://bit.ly/3nNKqrQ",
    },
    {
      image: "https://bit.ly/3bjYe8D",
      price: 15,
      description: "Rug in Blue",
      brand: "Home",
      link: "",
      swatchUrl: "https://bit.ly/3eRzCVu",
    },
    {
      image: "https://bit.ly/2RnnKT5",
      price: 1000,
      description: "Rug in Gray",
      brand: "Home",
      link: "",
      swatchUrl: "https://bit.ly/33h8Znq",
    },
    {
      image: "https://bit.ly/2RncdTY",
      price: 1700,
      description: "Rug in Vintage",
      brand: "Home Sheds",
      link: "",
      swatchUrl: "https://bit.ly/3xMdBjD",
    },
    {
      image: "https://bit.ly/2RjRAYF",
      price: 18.97,
      description: "Rug in  Gray Vintage",
      brand: "Home",
      link: "",
      swatchUrl: "https://bit.ly/3h1dWcn",
    },
  ],
};

export const getProducts = async () => {
  return new Promise((resolve) => {
    resolve(data);
  });
};

export const slowApi = async (price) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(price * 0.9);
    }, 3000);
  });
};
