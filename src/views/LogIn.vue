<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import api from '@/api';
import Cookies from 'js-cookie';

const login = ref({
    email: 'crebs@crebs.dev',
    password: '12345678',
    remember: false
});

const router = useRouter();
const store = useStore();

const nao_logado = ref(true)

onBeforeMount(() => {
    tentarLogin()
});

function redirecionarSeLogado() {
    setTimeout(() => {
        router.push('/AfterLogin'),
            500
    })
}

async function tentarLogin() {
    console.log('try login', Cookies.get('ses_token'))
    try {
        if (Cookies.get('ses_token')) {
            console.log('if cookie')
            var auth;
            await api.get('/check')
                .then((r) => {
                    auth = r.data
                    console.log('api then', auth)
                })
                .catch((e) => {
                    console.log(e.response)
                    nao_logado.value = false
                })
            if (auth === 1) {
                console.log('if auth', auth === 1, 'redireciona se logado')
                redirecionarSeLogado()
            } else {
                console.log('else ses_token null', auth)
                nao_logado.value = false
                Cookies.remove('ses_token')
            }
        } else {
            nao_logado.value = false
        }
    } catch (e) {
        nao_logado.value = false
        //console.log(e)
        //console.log(e?.response?.data.message)
    }/** */
}

const postLogin = async () => {
    console.log('postLogin')
    nao_logado.value = true
    try {
        await api.post('/login', {
            email: login.value.email,
            password: login.value.password
        })
            .then(auth => {
                console.log(auth.data)
                Cookies.set('ses_token', auth.data.authorization.token)
                setTimeout(() => {
                    redirecionarSeLogado()
                    nao_logado.value = false
                }, 1000)
            })

    } catch (error) {
        // console.log(error?.response?.data)
        console.log(error)
        nao_logado.value = false
    }
}

</script>
<template>
    <div v-if="!nao_logado">
        <div>
            <label for="E-mail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                E-mail
            </label>
            <input type="text" id="E-mail" v-model="login.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div>
            <label for="Senha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Senha
            </label>
            <input type="password" id="Senha" v-model="login.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <!--div class="flex mt-1">
            <label for="E-mail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lembrar de min
            </label>
            <input type="checkbox" id="E-mail" v-model="login.remember"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-1" />
        </div-->
        <div class="mt-4 flex justify-center">
            <button type="button" @click.prevent="postLogin"
                class="text-white bg-gradient-to-r from-green-600 to-green-900 dark:from-cyan-500 dark:to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-11/12 max-w-96">
                Login
            </button>
        </div>
    </div>
    <div class="text-center" v-else>
        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>