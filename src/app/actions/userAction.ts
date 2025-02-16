// import { revalidatePath } from 'next/cache';
// import { getUserSession } from './serverAction';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// let cachedUserData = null;

// export const fetchUserData = async () => {
//   if (cachedUserData) {
//     return cachedUserData; // 캐시된 데이터 반환
//   }

//   const { accessToken } = await getUserSession();

//   if (!accessToken) {
//     console.log('엑세스 토큰이 없습니다.');
//     return;
//   }

//   const response = await fetch(`${API_BASE_URL}/api/user/`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     credentials: 'include',
//     cache: 'force-cache',
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   cachedUserData = await response.json(); // 서버에서 받은 데이터를 캐시
//   return cachedUserData;
// };

// // export async function invalidateUserData() {
// //   revalidatePath('/subscription');
// //   revalidatePath('/myInfo');
// // }
