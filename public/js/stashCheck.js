document.querySelectorAll('.tryButton').forEach(button => {

    button.onclick = () => {

        const { index, stashid, userid } = button.dataset;
        const guess = document.getElementById(`guessField${index}`).value;
        axios
            .post(`/api/checkStash/${stashid}/${userid}`, { guess })
            .then(response => {
                console.log(response)
                const textField = document.getElementById(`stashMessage${index}`);
                textField.innerText = response.data.msg;
            })
            .catch(err => {
                const textField = document.getElementById(`stashMessage${index}`);
                textField.innerText = "There has been an error on the request";
            })
    }
})