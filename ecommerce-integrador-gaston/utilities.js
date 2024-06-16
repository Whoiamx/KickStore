export const getData = async (url) => {
  try {
    let res = await fetch(url);

    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
