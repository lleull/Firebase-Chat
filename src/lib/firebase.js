import React from 'react'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process?.env.FIRE_BASE_KEY,
  authDomain: 'e-learn-1de82.firebaseapp.com',
  projectId: 'e-learn-1de82',
  storageBucket: 'e-learn-1de82.firebasestorage.app',
  messagingSenderId: '199623523448',
  appId: '1:199623523448:web:999dc0cd3bae39646b018d',
  measurementId: 'G-R6TCZQYQFP',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
