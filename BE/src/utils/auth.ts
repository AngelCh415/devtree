import bcrypt from 'bcrypt'

export const hashPassword = async (password : string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const checkPassword = async(enterPassword: string, hash: string) =>{
    const result = await bcrypt.compare(enterPassword, hash)
    return result
}
