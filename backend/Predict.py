import sys
import random
import pandas as pd

if __name__ == "__main__":
    # Parse command-line arguments (assuming the number of words is passed as the first argument)
    num_words = int(sys.argv[1])

    # Load data from the CSV file and shuffle the words
    df = pd.read_csv('./dummy_data.csv')
    words = df['text'].tolist()
    random.shuffle(words)

    # Function to generate a random paragraph
    def generate_paragraph(num_words, words):
        # Repeat the words until the required number of words is reached
        paragraph = ' '.join(words * (num_words // len(words)) + words[:num_words % len(words)])
        
        # Capitalize the first letter
        paragraph = paragraph.capitalize()
        return paragraph

    # Check if the requested number of words is too large
    max_words = 1000000 # Set your desired maximum number of words
    if num_words > max_words:
        print(f"Error: Requested number of words ({num_words}) exceeds the maximum allowed ({max_words}).")
    else:
        # Generate a paragraph
        paragraph = generate_paragraph(num_words, words)
        
        # Print the generated paragraph to stdout (to be captured by Node.js)
        print(paragraph)
