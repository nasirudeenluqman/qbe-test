import { useState, useCallback, FormEvent, useMemo, ChangeEvent } from "react"
import { validateDateOfBirth, calculateAge } from "../utils/date-of-birth-utils"
import { AgeParams } from "../utils/types"

export const useDateOfBirthForm = () => {
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [age, setAge] = useState<AgeParams | undefined>(undefined)
    const maximumDate = new Date().toISOString().split('T')[0]

    const handleBlur = useCallback(() => {
        const validationMessage = validateDateOfBirth(dateOfBirth)
        setErrorMessage(validationMessage)
    }, [dateOfBirth, setErrorMessage])

    const isValid = useMemo(() => errorMessage === '' && dateOfBirth !== '', [dateOfBirth, errorMessage])

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()
        if (isValid) {
            const age = calculateAge(dateOfBirth)
            setAge(age)
        }
    }, [dateOfBirth, isValid])

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setDateOfBirth(event.target.value)
        setAge(undefined)
    }, [setDateOfBirth])

    return {
        maximumDate,
        dateOfBirth,
        handleChange,
        handleSubmit,
        handleBlur,
        errorMessage,
        isValid,
        age
    }
}