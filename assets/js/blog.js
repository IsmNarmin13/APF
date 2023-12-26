(async () => {
    const url = 'https://bts-wallpapers.p.rapidapi.com/categories';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5c082fb121mshe26c2a9f2bee845p1f4febjsn1a90948af89a',
        'X-RapidAPI-Host': 'bts-wallpapers.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.text();
  
      document.body.innerHTML = `<h1>BTS Wallpapers</h1><pre>${result}</pre>`;
    } catch (error) {
      console.error(error);
    }
  })();
  