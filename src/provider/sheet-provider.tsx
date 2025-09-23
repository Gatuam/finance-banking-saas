'use client'

import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet'
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet'
import { EditCategorySheet } from '@/features/categories/components/edit-category-sheet'
import { NewCategorySheet } from '@/features/categories/components/new-category-sheet'
import { NewTranscationSheet } from '@/features/transcations/components/new-transcation-sheet'
import React from 'react'

export const SheetProvider = () => {
  
  return (
    <>
      <NewAccountSheet/>
      <NewTranscationSheet/>
      <EditAccountSheet/>
      <NewCategorySheet/>
      <EditCategorySheet/>
    </>
  )
}


