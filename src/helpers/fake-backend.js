import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI';

let plans = [
    {
        id: 1,
        code: 'FREE',
        name: 'Free',
        isPopular: false,
        limitedStoriesForMonth: true,
        maxStoriesForMonth: 3,
        levelCustomization: 0,
        levelVoiceSynthesis: 0,
        hasPriorityCustomerSupport: false,
        price: 0,
        discountPerYear: 0
    },
    {
        id: 2,
        code: 'STORYCRAFT',
        name: 'StoryCraft',
        isPopular: false,
        limitedStoriesForMonth: true,
        maxStoriesForMonth: 5,
        levelCustomization: 1,
        levelVoiceSynthesis: 1,
        hasPriorityCustomerSupport: false,
        price: 4.99,
        discountPerYear: 50
    },
    {
        id: 3,
        code: 'STORYCRAFT_PLUS',
        name: 'StoryCraft Plus',
        isPopular: true,
        limitedStoriesForMonth: true,
        maxStoriesForMonth: 15,
        levelCustomization: 2,
        levelVoiceSynthesis: 2,
        hasPriorityCustomerSupport: false,
        price: 9.99,
        discountPerYear: 50
    },
    {
        id: 4,
        code: 'STORYCRAFT_PRO',
        name: 'StoryCraft Pro',
        isPopular: false,
        limitedStoriesForMonth: false,
        maxStoriesForMonth: 0,
        levelCustomization: 3,
        levelVoiceSynthesis: 3,
        hasPriorityCustomerSupport: true,
        price: 19.99,
        discountPerYear: 50
    },
]

let users = [
    { id: 1, name: 'Chatvia', username: 'themesbrand', password: '123456', email: 'admin@themesbrand.com', role: 'role', numberStoriesCurrentMonth: 0, currentPlan: plans[0], token: token }
];

const fakeBackend = () => {
    // This sets the mock adapter on the default instance
    var mock = new MockAdapter(axios);

    mock.onPost('/register').reply(function (config) {

        const user = JSON.parse(config['data']);
        user.id = users.length + 1;
        users.push(user);

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, user]);
            });
        });
    });

    mock.onPost('/login').reply(function (config) {
        const user = JSON.parse(config['data']);
        const validUser = users.filter(usr => usr.email === user.username && usr.password === user.password);

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (validUser['length'] === 1) {
                    resolve([200, validUser[0]]);
                } else {
                    reject({ "message": "Username and password are invalid. Please enter correct username and password" });
                }
            });
        });
    });

    mock.onPost('/forget-pwd').reply(function (config) {
        // User needs to check that user is eXist or not and send mail for Reset New password

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([200, "Check your mail and reset your password."]);
            });
        });

    });


}

export default fakeBackend;