import { regExpService } from "./regExpService";

export const getWorkItemsByQuery = (query) => {
    const pat = "dbpu36o5y4eczvdvy73nnl2fhbipszzthppbwwhoq3fphmf52e3q";
    const encodedPat = encodePat(pat);
    let host = "https://dev.azure.com/academicwork";
    let url = `${host}/AW-IT/_apis/wit/wiql?api-version=4.1`;

    var obj = {
        link: url,
        object: {
            body: `{"query": "${query}"}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedPat,
                'Host': host
            }
        }
    }

    return fetch(obj.link, obj.object).then(response => {
        return response.json().then(json => {
            if (json.workItems.length === 0) {
                return [{}];
            }
            const ids = buildIds(json.workItems);
            return getWorkItemsByIds(ids).then(workItems => {
                return workItems;
            });
        })
    })
}

export const getByQueryId = (project, queryId) => {
    const host = "https://academicwork.visualstudio.com";
    const url = `${host}/${project}/_apis/wit/wiql/${queryId}?api-version=4.1`;
    const pat = "dbpu36o5y4eczvdvy73nnl2fhbipszzthppbwwhoq3fphmf52e3q";
    const encodedPat = encodePat(pat);

    var obj = {
        link: url,
        object: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedPat,
                'Host': host
            }
        }
    };

    return fetch(obj.link, obj.object).then(response => {
            return response.json().then(j => {
                if (j.workItems.length === 0) {
                    return [{}];
                }
                const ids = buildIds(j.workItems);
                
                return getWorkItemsByIds(ids).then(workItems => {
                    return workItems;
                });
        })
    })
}

const getWorkItemsByIds = (ids) => {
    const host = "https://academicwork.visualstudio.com";
    const url = `${host}/AW-IT/_apis/wit/workitems?ids=${ids}&api-version=4.1`;
    const pat = "dbpu36o5y4eczvdvy73nnl2fhbipszzthppbwwhoq3fphmf52e3q";
    const encodedPat = encodePat(pat);

    let obj = {
        link: url,
        object: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encodedPat,
                'Host': host
            }
        }
    };

    return fetch(obj.link, obj.object).then(response => {
        return response.json().then(j => {
            let regExp = new regExpService();
            return regExp
                .stringify(j.value)
                .removeSystem()
                .removeCommon()
                .removeKanban()
                .removeAwKanban()
                .removeCustom()
                .removeWef()
                .objectify()
                .items;
        });
    });
}

const encodePat = pat => {
    var b = new Buffer(':' + pat);
    var s = b.toString('base64');
    return s;
}
const buildIds = workItems => {
    const ids = workItems.map(item => item.id);
    return ids.join();
}