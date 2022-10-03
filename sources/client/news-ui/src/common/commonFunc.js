const commonFunc = {

    generateFakeData: (pageSize, total, dataFake) => {
        var reponse = {
            data: [],
            total: total
        }

        for (let index = 0; index < pageSize; index++) {
            const newObject = {
                ...dataFake,
                Id: `${index}`,
                Key: `${index}`,

            }
            reponse.data.push(newObject)
        }
        return reponse;
    },

  
}

export default commonFunc;