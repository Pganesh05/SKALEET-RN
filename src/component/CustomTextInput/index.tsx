import { StyleSheet, TextInput, TextInputProps } from "react-native"

function CustomTextInput(props: TextInputProps) {

    return (<TextInput
        style={styles.textInputStyle}
        {...props}
    />)
}

export const styles = StyleSheet.create({
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginVertical: 8,
        paddingHorizontal: 8
    }
})

export default CustomTextInput