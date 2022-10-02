const BASE_URL = 'localhost:5000/';
const guessBtn = document.querySelector('#guess-button');

async function guessClick(e) {
    e.preventDefault();
    const guess = e.target.parentElement.querySelector('#guess-input').value;
    console.log(guess);
    // const response = await axios.get(
    //     `${BASE_URL}/guess/${guess}`,
    //     { headers: { 'Access-Control-Allow-Origin': '*' } }
    // );
    // console.log(response);

    const response = await axios.get(
        `${BASE_URL}`,
        { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
    console.log(response);
}

guessBtn.addEventListener('click', guessClick);

