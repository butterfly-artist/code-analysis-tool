import { CodeSample } from '../types/analyzer';

export const CODE_SAMPLES: CodeSample[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Basic program structure and output',
    language: 'c',
    difficulty: 'beginner',
    concepts: ['functions', 'output', 'main function'],
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
  },
  {
    id: 'factorial-recursive',
    title: 'Recursive Factorial',
    description: 'Recursive function implementation with edge cases',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['recursion', 'base case', 'mathematical functions'],
    code: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d is %d\\n", num, factorial(num));
    return 0;
}`
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort Algorithm',
    description: 'Sorting algorithm with nested loops',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['arrays', 'sorting', 'nested loops', 'swapping'],
    code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    bubbleSort(arr, n);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`
  },
  {
    id: 'linked-list',
    title: 'Linked List Implementation',
    description: 'Dynamic data structure with memory management',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['pointers', 'dynamic memory', 'data structures'],
    code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

void insert(struct Node** head, int data) {
    struct Node* newNode = malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

void display(struct Node* head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    insert(&head, 3);
    insert(&head, 2);
    insert(&head, 1);
    display(head);
    return 0;
}`
  },
  {
    id: 'matrix-multiplication',
    title: 'Matrix Multiplication',
    description: 'Two-dimensional array operations',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['2D arrays', 'nested loops', 'mathematical operations'],
    code: `#include <stdio.h>

void multiplyMatrices(int first[][3], int second[][3], int result[][3]) {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            result[i][j] = 0;
            for (int k = 0; k < 3; k++) {
                result[i][j] += first[i][k] * second[k][j];
            }
        }
    }
}

int main() {
    int first[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int second[3][3] = {{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
    int result[3][3];
    
    multiplyMatrices(first, second, result);
    
    printf("Result matrix:\\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", result[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Efficient search algorithm for sorted arrays',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['searching', 'divide and conquer', 'sorted arrays'],
    code: `#include <stdio.h>

int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    
    int result = binarySearch(arr, 0, n - 1, target);
    
    if (result != -1) {
        printf("Element found at index %d\\n", result);
    } else {
        printf("Element not found\\n");
    }
    return 0;
}`
  },
  {
    id: 'fibonacci-iterative',
    title: 'Fibonacci Sequence (Iterative)',
    description: 'Iterative approach to generate Fibonacci numbers',
    language: 'c',
    difficulty: 'beginner',
    concepts: ['loops', 'sequences', 'variables'],
    code: `#include <stdio.h>

int main() {
    int n = 10;
    int first = 0, second = 1, next;
    
    printf("Fibonacci sequence: %d %d ", first, second);
    
    for (int i = 2; i < n; i++) {
        next = first + second;
        printf("%d ", next);
        first = second;
        second = next;
    }
    printf("\\n");
    return 0;
}`
  },
  {
    id: 'string-reverse',
    title: 'String Reversal',
    description: 'Character array manipulation and string operations',
    language: 'c',
    difficulty: 'beginner',
    concepts: ['strings', 'arrays', 'character manipulation'],
    code: `#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int length = strlen(str);
    for (int i = 0; i < length / 2; i++) {
        char temp = str[i];
        str[i] = str[length - 1 - i];
        str[length - 1 - i] = temp;
    }
}

int main() {
    char str[] = "Hello World";
    printf("Original: %s\\n", str);
    reverseString(str);
    printf("Reversed: %s\\n", str);
    return 0;
}`
  },
  {
    id: 'prime-checker',
    title: 'Prime Number Checker',
    description: 'Algorithm to check if a number is prime',
    language: 'c',
    difficulty: 'beginner',
    concepts: ['conditionals', 'loops', 'mathematical logic'],
    code: `#include <stdio.h>
#include <math.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    if (n <= 3) return 1;
    if (n % 2 == 0 || n % 3 == 0) return 0;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return 0;
        }
    }
    return 1;
}

int main() {
    int num = 29;
    if (isPrime(num)) {
        printf("%d is a prime number\\n", num);
    } else {
        printf("%d is not a prime number\\n", num);
    }
    return 0;
}`
  },
  {
    id: 'calculator',
    title: 'Simple Calculator',
    description: 'Basic arithmetic operations with user input',
    language: 'c',
    difficulty: 'beginner',
    concepts: ['switch statements', 'user input', 'arithmetic operations'],
    code: `#include <stdio.h>

int main() {
    char operator;
    double num1, num2, result;
    
    printf("Enter operator (+, -, *, /): ");
    scanf("%c", &operator);
    
    printf("Enter two numbers: ");
    scanf("%lf %lf", &num1, &num2);
    
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
            } else {
                printf("Error: Division by zero\\n");
                return 1;
            }
            break;
        default:
            printf("Invalid operator\\n");
            return 1;
    }
    
    printf("Result: %.2f\\n", result);
    return 0;
}`
  },
  {
    id: 'array-sum',
    title: 'Array Sum and Average',
    description: 'Basic array operations and calculations',
    language: 'c',
    difficulty: 'beginner',
    concepts: ['arrays', 'loops', 'arithmetic'],
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int size = sizeof(arr) / sizeof(arr[0]);
    int sum = 0;
    
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    
    double average = (double)sum / size;
    
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\nSum: %d\\n", sum);
    printf("Average: %.2f\\n", average);
    
    return 0;
}`
  },
  {
    id: 'palindrome-checker',
    title: 'Palindrome Checker',
    description: 'String comparison and validation logic',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['strings', 'comparison', 'validation'],
    code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int isPalindrome(char str[]) {
    int left = 0;
    int right = strlen(str) - 1;
    
    while (left < right) {
        while (left < right && !isalnum(str[left])) {
            left++;
        }
        while (left < right && !isalnum(str[right])) {
            right--;
        }
        
        if (tolower(str[left]) != tolower(str[right])) {
            return 0;
        }
        
        left++;
        right--;
    }
    return 1;
}

int main() {
    char str[] = "A man a plan a canal Panama";
    
    if (isPalindrome(str)) {
        printf("'%s' is a palindrome\\n", str);
    } else {
        printf("'%s' is not a palindrome\\n", str);
    }
    
    return 0;
}`
  },
  {
    id: 'struct-student',
    title: 'Student Record System',
    description: 'Structure definition and data organization',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['structures', 'data organization', 'arrays of structures'],
    code: `#include <stdio.h>
#include <string.h>

struct Student {
    int id;
    char name[50];
    float gpa;
};

void displayStudent(struct Student s) {
    printf("ID: %d, Name: %s, GPA: %.2f\\n", s.id, s.name, s.gpa);
}

int main() {
    struct Student students[3] = {
        {1, "Alice Johnson", 3.8},
        {2, "Bob Smith", 3.2},
        {3, "Carol Davis", 3.9}
    };
    
    printf("Student Records:\\n");
    for (int i = 0; i < 3; i++) {
        displayStudent(students[i]);
    }
    
    return 0;
}`
  },
  {
    id: 'file-operations',
    title: 'File Read and Write',
    description: 'File handling and I/O operations',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['file I/O', 'error handling', 'file pointers'],
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file;
    char data[] = "Hello, File Operations!";
    char buffer[100];
    
    // Write to file
    file = fopen("test.txt", "w");
    if (file == NULL) {
        printf("Error opening file for writing\\n");
        return 1;
    }
    
    fprintf(file, "%s", data);
    fclose(file);
    
    // Read from file
    file = fopen("test.txt", "r");
    if (file == NULL) {
        printf("Error opening file for reading\\n");
        return 1;
    }
    
    fgets(buffer, sizeof(buffer), file);
    printf("Read from file: %s\\n", buffer);
    fclose(file);
    
    return 0;
}`
  },
  {
    id: 'pointer-arithmetic',
    title: 'Pointer Arithmetic',
    description: 'Advanced pointer operations and memory access',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['pointers', 'memory addresses', 'pointer arithmetic'],
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    printf("Array elements using pointer arithmetic:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d, address = %p\\n", i, *(ptr + i), (ptr + i));
    }
    
    printf("\\nUsing pointer increment:\\n");
    ptr = arr;
    for (int i = 0; i < 5; i++) {
        printf("Value: %d, Address: %p\\n", *ptr, ptr);
        ptr++;
    }
    
    return 0;
}`
  },
  {
    id: 'dynamic-memory',
    title: 'Dynamic Memory Allocation',
    description: 'Memory management with malloc and free',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['dynamic memory', 'malloc', 'free', 'memory leaks'],
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = malloc(n * sizeof(int));
    
    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }
    
    // Initialize array
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    
    printf("Dynamic array elements:\\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    
    // Resize array
    n = 8;
    arr = realloc(arr, n * sizeof(int));
    
    // Initialize new elements
    for (int i = 5; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    
    printf("\\nResized array:\\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }
    
    free(arr);
    return 0;
}`
  },
  {
    id: 'function-pointers',
    title: 'Function Pointers',
    description: 'Advanced function pointer usage and callbacks',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['function pointers', 'callbacks', 'indirect function calls'],
    code: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int calculate(int x, int y, int (*operation)(int, int)) {
    return operation(x, y);
}

int main() {
    int a = 10, b = 5;
    
    int (*func_ptr)(int, int);
    
    func_ptr = add;
    printf("Addition: %d + %d = %d\\n", a, b, func_ptr(a, b));
    
    func_ptr = multiply;
    printf("Multiplication: %d * %d = %d\\n", a, b, func_ptr(a, b));
    
    printf("Using callback: %d + %d = %d\\n", a, b, calculate(a, b, add));
    printf("Using callback: %d * %d = %d\\n", a, b, calculate(a, b, multiply));
    
    return 0;
}`
  },
  {
    id: 'quicksort',
    title: 'Quick Sort Algorithm',
    description: 'Divide and conquer sorting algorithm',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['recursion', 'divide and conquer', 'partitioning'],
    code: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    quickSort(arr, 0, n - 1);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`
  },
  {
    id: 'binary-tree',
    title: 'Binary Tree Operations',
    description: 'Tree data structure with traversal algorithms',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['trees', 'recursion', 'data structures', 'traversal'],
    code: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode* left;
    struct TreeNode* right;
};

struct TreeNode* createNode(int data) {
    struct TreeNode* node = malloc(sizeof(struct TreeNode));
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void inorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        printf("%d ", root->data);
        inorderTraversal(root->right);
    }
}

void preorderTraversal(struct TreeNode* root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    }
}

int main() {
    struct TreeNode* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    
    printf("Inorder traversal: ");
    inorderTraversal(root);
    printf("\\n");
    
    printf("Preorder traversal: ");
    preorderTraversal(root);
    printf("\\n");
    
    return 0;
}`
  },
  {
    id: 'hash-table',
    title: 'Hash Table Implementation',
    description: 'Hash table with collision handling',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['hashing', 'collision resolution', 'data structures'],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10

struct HashNode {
    char* key;
    int value;
    struct HashNode* next;
};

struct HashTable {
    struct HashNode* table[TABLE_SIZE];
};

unsigned int hash(char* key) {
    unsigned int hash = 0;
    while (*key) {
        hash = (hash << 5) + *key++;
    }
    return hash % TABLE_SIZE;
}

void insert(struct HashTable* ht, char* key, int value) {
    unsigned int index = hash(key);
    struct HashNode* newNode = malloc(sizeof(struct HashNode));
    newNode->key = malloc(strlen(key) + 1);
    strcpy(newNode->key, key);
    newNode->value = value;
    newNode->next = ht->table[index];
    ht->table[index] = newNode;
}

int search(struct HashTable* ht, char* key) {
    unsigned int index = hash(key);
    struct HashNode* node = ht->table[index];
    
    while (node) {
        if (strcmp(node->key, key) == 0) {
            return node->value;
        }
        node = node->next;
    }
    return -1;
}

int main() {
    struct HashTable ht = {0};
    
    insert(&ht, "apple", 5);
    insert(&ht, "banana", 3);
    insert(&ht, "orange", 8);
    
    printf("apple: %d\\n", search(&ht, "apple"));
    printf("banana: %d\\n", search(&ht, "banana"));
    printf("grape: %d\\n", search(&ht, "grape"));
    
    return 0;
}`
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort Algorithm',
    description: 'Stable divide and conquer sorting',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['divide and conquer', 'merging', 'stable sorting'],
    code: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int* leftArr = malloc(n1 * sizeof(int));
    int* rightArr = malloc(n2 * sizeof(int));
    
    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
    
    free(leftArr);
    free(rightArr);
}

void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    
    mergeSort(arr, 0, n - 1);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
    
    return 0;
}`
  },
  {
    id: 'graph-dfs',
    title: 'Graph Depth-First Search',
    description: 'Graph traversal using DFS algorithm',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['graphs', 'traversal', 'recursion', 'adjacency list'],
    code: `#include <stdio.h>
#include <stdlib.h>

struct AdjListNode {
    int dest;
    struct AdjListNode* next;
};

struct AdjList {
    struct AdjListNode* head;
};

struct Graph {
    int vertices;
    struct AdjList* array;
};

struct Graph* createGraph(int vertices) {
    struct Graph* graph = malloc(sizeof(struct Graph));
    graph->vertices = vertices;
    graph->array = malloc(vertices * sizeof(struct AdjList));
    
    for (int i = 0; i < vertices; ++i)
        graph->array[i].head = NULL;
    
    return graph;
}

void addEdge(struct Graph* graph, int src, int dest) {
    struct AdjListNode* newNode = malloc(sizeof(struct AdjListNode));
    newNode->dest = dest;
    newNode->next = graph->array[src].head;
    graph->array[src].head = newNode;
    
    newNode = malloc(sizeof(struct AdjListNode));
    newNode->dest = src;
    newNode->next = graph->array[dest].head;
    graph->array[dest].head = newNode;
}

void DFSUtil(struct Graph* graph, int vertex, int visited[]) {
    visited[vertex] = 1;
    printf("%d ", vertex);
    
    struct AdjListNode* temp = graph->array[vertex].head;
    while (temp) {
        if (!visited[temp->dest])
            DFSUtil(graph, temp->dest, visited);
        temp = temp->next;
    }
}

void DFS(struct Graph* graph, int startVertex) {
    int* visited = calloc(graph->vertices, sizeof(int));
    printf("DFS traversal starting from vertex %d: ", startVertex);
    DFSUtil(graph, startVertex, visited);
    printf("\\n");
    free(visited);
}

int main() {
    struct Graph* graph = createGraph(4);
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 2);
    addEdge(graph, 1, 2);
    addEdge(graph, 2, 3);
    
    DFS(graph, 2);
    
    return 0;
}`
  },
  {
    id: 'stack-implementation',
    title: 'Stack Data Structure',
    description: 'Stack implementation with array and operations',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['stacks', 'LIFO', 'data structures', 'array implementation'],
    code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100

struct Stack {
    int items[MAX_SIZE];
    int top;
};

void initialize(struct Stack* stack) {
    stack->top = -1;
}

int isEmpty(struct Stack* stack) {
    return stack->top == -1;
}

int isFull(struct Stack* stack) {
    return stack->top == MAX_SIZE - 1;
}

void push(struct Stack* stack, int item) {
    if (isFull(stack)) {
        printf("Stack overflow\\n");
        return;
    }
    stack->items[++stack->top] = item;
    printf("Pushed %d\\n", item);
}

int pop(struct Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack underflow\\n");
        return -1;
    }
    return stack->items[stack->top--];
}

int peek(struct Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty\\n");
        return -1;
    }
    return stack->items[stack->top];
}

int main() {
    struct Stack stack;
    initialize(&stack);
    
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);
    
    printf("Top element: %d\\n", peek(&stack));
    printf("Popped: %d\\n", pop(&stack));
    printf("Popped: %d\\n", pop(&stack));
    
    return 0;
}`
  },
  {
    id: 'queue-implementation',
    title: 'Queue Data Structure',
    description: 'Queue implementation with circular array',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['queues', 'FIFO', 'circular arrays', 'data structures'],
    code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 5

struct Queue {
    int items[MAX_SIZE];
    int front;
    int rear;
    int size;
};

void initialize(struct Queue* queue) {
    queue->front = 0;
    queue->rear = -1;
    queue->size = 0;
}

int isEmpty(struct Queue* queue) {
    return queue->size == 0;
}

int isFull(struct Queue* queue) {
    return queue->size == MAX_SIZE;
}

void enqueue(struct Queue* queue, int item) {
    if (isFull(queue)) {
        printf("Queue overflow\\n");
        return;
    }
    queue->rear = (queue->rear + 1) % MAX_SIZE;
    queue->items[queue->rear] = item;
    queue->size++;
    printf("Enqueued %d\\n", item);
}

int dequeue(struct Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue underflow\\n");
        return -1;
    }
    int item = queue->items[queue->front];
    queue->front = (queue->front + 1) % MAX_SIZE;
    queue->size--;
    return item;
}

int main() {
    struct Queue queue;
    initialize(&queue);
    
    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);
    
    printf("Dequeued: %d\\n", dequeue(&queue));
    printf("Dequeued: %d\\n", dequeue(&queue));
    
    enqueue(&queue, 40);
    enqueue(&queue, 50);
    
    return 0;
}`
  },
  {
    id: 'string-functions',
    title: 'Custom String Functions',
    description: 'Implementation of common string operations',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['strings', 'character arrays', 'string manipulation'],
    code: `#include <stdio.h>

int stringLength(char str[]) {
    int length = 0;
    while (str[length] != '\\0') {
        length++;
    }
    return length;
}

void stringCopy(char dest[], char src[]) {
    int i = 0;
    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';
}

void stringConcat(char dest[], char src[]) {
    int destLen = stringLength(dest);
    int i = 0;
    
    while (src[i] != '\\0') {
        dest[destLen + i] = src[i];
        i++;
    }
    dest[destLen + i] = '\\0';
}

int stringCompare(char str1[], char str2[]) {
    int i = 0;
    while (str1[i] != '\\0' && str2[i] != '\\0') {
        if (str1[i] != str2[i]) {
            return str1[i] - str2[i];
        }
        i++;
    }
    return str1[i] - str2[i];
}

int main() {
    char str1[100] = "Hello";
    char str2[100] = "World";
    char str3[100];
    
    printf("Length of '%s': %d\\n", str1, stringLength(str1));
    
    stringCopy(str3, str1);
    printf("Copied string: %s\\n", str3);
    
    stringConcat(str1, " ");
    stringConcat(str1, str2);
    printf("Concatenated: %s\\n", str1);
    
    printf("Comparison result: %d\\n", stringCompare("abc", "abc"));
    
    return 0;
}`
  },
  {
    id: 'number-systems',
    title: 'Number System Conversion',
    description: 'Convert between different number systems',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['number systems', 'base conversion', 'mathematical operations'],
    code: `#include <stdio.h>
#include <string.h>

void decimalToBinary(int decimal) {
    if (decimal == 0) {
        printf("0");
        return;
    }
    
    char binary[32];
    int index = 0;
    
    while (decimal > 0) {
        binary[index++] = (decimal % 2) + '0';
        decimal /= 2;
    }
    
    printf("Binary: ");
    for (int i = index - 1; i >= 0; i--) {
        printf("%c", binary[i]);
    }
    printf("\\n");
}

void decimalToHex(int decimal) {
    if (decimal == 0) {
        printf("Hexadecimal: 0\\n");
        return;
    }
    
    char hex[16];
    int index = 0;
    char hexDigits[] = "0123456789ABCDEF";
    
    while (decimal > 0) {
        hex[index++] = hexDigits[decimal % 16];
        decimal /= 16;
    }
    
    printf("Hexadecimal: ");
    for (int i = index - 1; i >= 0; i--) {
        printf("%c", hex[i]);
    }
    printf("\\n");
}

int binaryToDecimal(char binary[]) {
    int decimal = 0;
    int base = 1;
    int length = strlen(binary);
    
    for (int i = length - 1; i >= 0; i--) {
        if (binary[i] == '1') {
            decimal += base;
        }
        base *= 2;
    }
    
    return decimal;
}

int main() {
    int number = 42;
    
    printf("Decimal: %d\\n", number);
    decimalToBinary(number);
    decimalToHex(number);
    
    char binaryStr[] = "101010";
    printf("\\nBinary '%s' to Decimal: %d\\n", binaryStr, binaryToDecimal(binaryStr));
    
    return 0;
}`
  },
  {
    id: 'error-handling',
    title: 'Error Handling Patterns',
    description: 'Proper error handling and validation techniques',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['error handling', 'validation', 'defensive programming'],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

typedef enum {
    SUCCESS = 0,
    ERROR_NULL_POINTER,
    ERROR_INVALID_INPUT,
    ERROR_MEMORY_ALLOCATION,
    ERROR_FILE_OPERATION
} ErrorCode;

ErrorCode safeDivide(double a, double b, double* result) {
    if (result == NULL) {
        return ERROR_NULL_POINTER;
    }
    
    if (b == 0.0) {
        return ERROR_INVALID_INPUT;
    }
    
    *result = a / b;
    return SUCCESS;
}

ErrorCode safeArrayAccess(int* arr, int size, int index, int* value) {
    if (arr == NULL || value == NULL) {
        return ERROR_NULL_POINTER;
    }
    
    if (index < 0 || index >= size) {
        return ERROR_INVALID_INPUT;
    }
    
    *value = arr[index];
    return SUCCESS;
}

const char* getErrorMessage(ErrorCode error) {
    switch (error) {
        case SUCCESS:
            return "Operation successful";
        case ERROR_NULL_POINTER:
            return "Null pointer error";
        case ERROR_INVALID_INPUT:
            return "Invalid input provided";
        case ERROR_MEMORY_ALLOCATION:
            return "Memory allocation failed";
        case ERROR_FILE_OPERATION:
            return "File operation failed";
        default:
            return "Unknown error";
    }
}

int main() {
    double result;
    ErrorCode error;
    
    // Test division
    error = safeDivide(10.0, 2.0, &result);
    if (error == SUCCESS) {
        printf("Division result: %.2f\\n", result);
    } else {
        printf("Error: %s\\n", getErrorMessage(error));
    }
    
    // Test division by zero
    error = safeDivide(10.0, 0.0, &result);
    if (error != SUCCESS) {
        printf("Error: %s\\n", getErrorMessage(error));
    }
    
    // Test array access
    int arr[] = {1, 2, 3, 4, 5};
    int value;
    
    error = safeArrayAccess(arr, 5, 2, &value);
    if (error == SUCCESS) {
        printf("Array value at index 2: %d\\n", value);
    } else {
        printf("Error: %s\\n", getErrorMessage(error));
    }
    
    // Test invalid array access
    error = safeArrayAccess(arr, 5, 10, &value);
    if (error != SUCCESS) {
        printf("Error: %s\\n", getErrorMessage(error));
    }
    
    return 0;
}`
  },
  {
    id: 'bit-operations',
    title: 'Bitwise Operations',
    description: 'Bit manipulation and bitwise operators',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['bitwise operations', 'bit manipulation', 'binary arithmetic'],
    code: `#include <stdio.h>

void printBinary(int num) {
    for (int i = 31; i >= 0; i--) {
        printf("%d", (num >> i) & 1);
        if (i % 4 == 0) printf(" ");
    }
    printf("\\n");
}

int countSetBits(int num) {
    int count = 0;
    while (num) {
        count += num & 1;
        num >>= 1;
    }
    return count;
}

int isPowerOfTwo(int num) {
    return num > 0 && (num & (num - 1)) == 0;
}

void swapWithoutTemp(int* a, int* b) {
    if (a != b) {
        *a = *a ^ *b;
        *b = *a ^ *b;
        *a = *a ^ *b;
    }
}

int main() {
    int a = 12, b = 25;
    
    printf("a = %d, binary: ", a);
    printBinary(a);
    printf("b = %d, binary: ", b);
    printBinary(b);
    
    printf("\\nBitwise Operations:\\n");
    printf("a & b = %d\\n", a & b);
    printf("a | b = %d\\n", a | b);
    printf("a ^ b = %d\\n", a ^ b);
    printf("~a = %d\\n", ~a);
    printf("a << 2 = %d\\n", a << 2);
    printf("a >> 2 = %d\\n", a >> 2);
    
    printf("\\nSet bits in %d: %d\\n", a, countSetBits(a));
    printf("Is %d power of 2? %s\\n", 16, isPowerOfTwo(16) ? "Yes" : "No");
    printf("Is %d power of 2? %s\\n", 15, isPowerOfTwo(15) ? "Yes" : "No");
    
    printf("\\nBefore swap: a = %d, b = %d\\n", a, b);
    swapWithoutTemp(&a, &b);
    printf("After swap: a = %d, b = %d\\n", a, b);
    
    return 0;
}`
  },
  {
    id: 'command-line-args',
    title: 'Command Line Arguments',
    description: 'Processing command line arguments and parameters',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['command line', 'argc', 'argv', 'program arguments'],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void printUsage(char* programName) {
    printf("Usage: %s [options] <input>\\n", programName);
    printf("Options:\\n");
    printf("  -h, --help     Show this help message\\n");
    printf("  -v, --verbose  Enable verbose output\\n");
    printf("  -n <number>    Specify a number\\n");
}

int main(int argc, char* argv[]) {
    int verbose = 0;
    int number = 0;
    char* input = NULL;
    
    printf("Program name: %s\\n", argv[0]);
    printf("Number of arguments: %d\\n", argc);
    
    // Parse command line arguments
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-h") == 0 || strcmp(argv[i], "--help") == 0) {
            printUsage(argv[0]);
            return 0;
        } else if (strcmp(argv[i], "-v") == 0 || strcmp(argv[i], "--verbose") == 0) {
            verbose = 1;
            if (verbose) printf("Verbose mode enabled\\n");
        } else if (strcmp(argv[i], "-n") == 0) {
            if (i + 1 < argc) {
                number = atoi(argv[++i]);
                if (verbose) printf("Number set to: %d\\n", number);
            } else {
                printf("Error: -n requires a number\\n");
                return 1;
            }
        } else {
            input = argv[i];
            if (verbose) printf("Input set to: %s\\n", input);
        }
    }
    
    // Process the arguments
    if (input == NULL) {
        printf("Error: No input provided\\n");
        printUsage(argv[0]);
        return 1;
    }
    
    printf("\\nProcessing input: %s\\n", input);
    if (number > 0) {
        printf("Using number: %d\\n", number);
    }
    
    return 0;
}`
  },
  {
    id: 'memory-management',
    title: 'Advanced Memory Management',
    description: 'Memory allocation patterns and best practices',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['memory management', 'allocation strategies', 'memory pools'],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    void* memory;
    size_t size;
    size_t used;
} MemoryPool;

MemoryPool* createMemoryPool(size_t size) {
    MemoryPool* pool = malloc(sizeof(MemoryPool));
    if (!pool) return NULL;
    
    pool->memory = malloc(size);
    if (!pool->memory) {
        free(pool);
        return NULL;
    }
    
    pool->size = size;
    pool->used = 0;
    return pool;
}

void* poolAlloc(MemoryPool* pool, size_t size) {
    if (!pool || pool->used + size > pool->size) {
        return NULL;
    }
    
    void* ptr = (char*)pool->memory + pool->used;
    pool->used += size;
    return ptr;
}

void destroyMemoryPool(MemoryPool* pool) {
    if (pool) {
        free(pool->memory);
        free(pool);
    }
}

void* safeRealloc(void* ptr, size_t oldSize, size_t newSize) {
    void* newPtr = malloc(newSize);
    if (!newPtr) return NULL;
    
    if (ptr) {
        memcpy(newPtr, ptr, oldSize < newSize ? oldSize : newSize);
        free(ptr);
    }
    
    return newPtr;
}

int main() {
    // Memory pool example
    MemoryPool* pool = createMemoryPool(1024);
    if (!pool) {
        printf("Failed to create memory pool\\n");
        return 1;
    }
    
    // Allocate from pool
    int* numbers = poolAlloc(pool, 10 * sizeof(int));
    char* string = poolAlloc(pool, 50 * sizeof(char));
    
    if (numbers && string) {
        for (int i = 0; i < 10; i++) {
            numbers[i] = i * i;
        }
        strcpy(string, "Hello from memory pool!");
        
        printf("Numbers: ");
        for (int i = 0; i < 10; i++) {
            printf("%d ", numbers[i]);
        }
        printf("\\nString: %s\\n", string);
        
        printf("Pool usage: %zu/%zu bytes\\n", pool->used, pool->size);
    }
    
    destroyMemoryPool(pool);
    
    // Safe realloc example
    int* arr = malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) {
        arr[i] = i + 1;
    }
    
    arr = safeRealloc(arr, 5 * sizeof(int), 10 * sizeof(int));
    if (arr) {
        for (int i = 5; i < 10; i++) {
            arr[i] = i + 1;
        }
        
        printf("\\nReallocated array: ");
        for (int i = 0; i < 10; i++) {
            printf("%d ", arr[i]);
        }
        printf("\\n");
        
        free(arr);
    }
    
    return 0;
}`
  },
  {
    id: 'preprocessor-macros',
    title: 'Preprocessor Macros',
    description: 'Advanced preprocessor directives and macro programming',
    language: 'c',
    difficulty: 'intermediate',
    concepts: ['preprocessor', 'macros', 'conditional compilation'],
    code: `#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))
#define SWAP(a, b, type) do { type temp = a; a = b; b = temp; } while(0)

#define DEBUG 1

#if DEBUG
    #define DBG_PRINT(fmt, ...) printf("DEBUG: " fmt, ##__VA_ARGS__)
#else
    #define DBG_PRINT(fmt, ...)
#endif

#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

#define STRINGIFY(x) #x
#define CONCAT(a, b) a##b

// Multi-line macro
#define PRINT_ARRAY(arr, size) do { \\
    printf(#arr " = ["); \\
    for (int i = 0; i < size; i++) { \\
        printf("%d", arr[i]); \\
        if (i < size - 1) printf(", "); \\
    } \\
    printf("]\\n"); \\
} while(0)

int main() {
    int a = 10, b = 20;
    
    printf("MAX(%d, %d) = %d\\n", a, b, MAX(a, b));
    printf("MIN(%d, %d) = %d\\n", a, b, MIN(a, b));
    printf("SQUARE(%d) = %d\\n", a, SQUARE(a));
    
    DBG_PRINT("Before swap: a = %d, b = %d\\n", a, b);
    SWAP(a, b, int);
    DBG_PRINT("After swap: a = %d, b = %d\\n", a, b);
    
    int numbers[] = {1, 2, 3, 4, 5};
    printf("Array size: %zu\\n", ARRAY_SIZE(numbers));
    
    PRINT_ARRAY(numbers, ARRAY_SIZE(numbers));
    
    printf("Stringified: %s\\n", STRINGIFY(Hello World));
    
    int CONCAT(var, 123) = 42;
    printf("var123 = %d\\n", var123);
    
    #ifdef DEBUG
        printf("Debug mode is enabled\\n");
    #endif
    
    return 0;
}`
  },
  {
    id: 'variadic-functions',
    title: 'Variadic Functions',
    description: 'Functions with variable number of arguments',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['variadic functions', 'stdarg.h', 'variable arguments'],
    code: `#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    
    va_end(args);
    return total;
}

double average(int count, ...) {
    if (count == 0) return 0.0;
    
    va_list args;
    va_start(args, count);
    
    double total = 0.0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, double);
    }
    
    va_end(args);
    return total / count;
}

void printInts(const char* format, ...) {
    va_list args;
    va_start(args, format);
    
    printf("Printing integers: ");
    while (*format) {
        if (*format == 'd') {
            int value = va_arg(args, int);
            printf("%d ", value);
        }
        format++;
    }
    printf("\\n");
    
    va_end(args);
}

int findMax(int count, ...) {
    if (count == 0) return 0;
    
    va_list args;
    va_start(args, count);
    
    int max = va_arg(args, int);
    for (int i = 1; i < count; i++) {
        int current = va_arg(args, int);
        if (current > max) {
            max = current;
        }
    }
    
    va_end(args);
    return max;
}

int main() {
    printf("Sum of 3 numbers: %d\\n", sum(3, 10, 20, 30));
    printf("Sum of 5 numbers: %d\\n", sum(5, 1, 2, 3, 4, 5));
    
    printf("Average of 4 numbers: %.2f\\n", average(4, 10.5, 20.3, 15.7, 8.1));
    
    printInts("ddd", 100, 200, 300);
    printInts("dddd", 1, 2, 3, 4);
    
    printf("Maximum of 6 numbers: %d\\n", findMax(6, 45, 23, 78, 12, 67, 34));
    
    return 0;
}`
  },
  {
    id: 'signal-handling',
    title: 'Signal Handling',
    description: 'Handling system signals and interrupts',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['signals', 'signal handlers', 'system programming'],
    code: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <stdlib.h>

volatile sig_atomic_t keep_running = 1;
volatile sig_atomic_t signal_count = 0;

void signal_handler(int signal_num) {
    signal_count++;
    
    switch (signal_num) {
        case SIGINT:
            printf("\\nReceived SIGINT (Ctrl+C) - Signal #%d\\n", signal_count);
            if (signal_count >= 3) {
                printf("Received 3 SIGINT signals, exiting...\\n");
                keep_running = 0;
            } else {
                printf("Press Ctrl+C %d more time(s) to exit\\n", 3 - signal_count);
            }
            break;
            
        case SIGTERM:
            printf("\\nReceived SIGTERM - Terminating gracefully\\n");
            keep_running = 0;
            break;
            
        case SIGUSR1:
            printf("\\nReceived SIGUSR1 - User defined signal\\n");
            break;
            
        default:
            printf("\\nReceived signal %d\\n", signal_num);
            break;
    }
}

void setup_signal_handlers() {
    struct sigaction sa;
    sa.sa_handler = signal_handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    
    if (sigaction(SIGINT, &sa, NULL) == -1) {
        perror("sigaction SIGINT");
        exit(1);
    }
    
    if (sigaction(SIGTERM, &sa, NULL) == -1) {
        perror("sigaction SIGTERM");
        exit(1);
    }
    
    if (sigaction(SIGUSR1, &sa, NULL) == -1) {
        perror("sigaction SIGUSR1");
        exit(1);
    }
}

int main() {
    printf("Signal handling demo (PID: %d)\\n", getpid());
    printf("Press Ctrl+C to send SIGINT\\n");
    printf("Use 'kill -USR1 %d' to send SIGUSR1\\n", getpid());
    printf("Use 'kill %d' to send SIGTERM\\n", getpid());
    
    setup_signal_handlers();
    
    int counter = 0;
    while (keep_running) {
        printf("Running... %d (signals received: %d)\\r", ++counter, signal_count);
        fflush(stdout);
        sleep(1);
    }
    
    printf("\\nProgram terminated gracefully\\n");
    return 0;
}`
  },
  {
    id: 'thread-basics',
    title: 'Basic Threading',
    description: 'Introduction to POSIX threads (pthreads)',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['threading', 'pthreads', 'concurrent programming'],
    code: `#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <stdlib.h>

#define NUM_THREADS 3

struct ThreadData {
    int thread_id;
    int iterations;
    char* message;
};

void* thread_function(void* arg) {
    struct ThreadData* data = (struct ThreadData*)arg;
    
    printf("Thread %d starting with message: %s\\n", data->thread_id, data->message);
    
    for (int i = 0; i < data->iterations; i++) {
        printf("Thread %d: iteration %d\\n", data->thread_id, i + 1);
        sleep(1);
    }
    
    printf("Thread %d finished\\n", data->thread_id);
    
    // Return some data
    int* result = malloc(sizeof(int));
    *result = data->thread_id * 100;
    return result;
}

void* counter_thread(void* arg) {
    int* count = (int*)arg;
    
    for (int i = 0; i < 5; i++) {
        (*count)++;
        printf("Counter: %d\\n", *count);
        sleep(1);
    }
    
    return NULL;
}

int main() {
    pthread_t threads[NUM_THREADS];
    struct ThreadData thread_data[NUM_THREADS];
    
    // Create multiple threads with different data
    for (int i = 0; i < NUM_THREADS; i++) {
        thread_data[i].thread_id = i + 1;
        thread_data[i].iterations = 3 + i;
        thread_data[i].message = (i == 0) ? "First thread" : 
                                 (i == 1) ? "Second thread" : "Third thread";
        
        int result = pthread_create(&threads[i], NULL, thread_function, &thread_data[i]);
        if (result != 0) {
            printf("Error creating thread %d\\n", i);
            return 1;
        }
    }
    
    // Wait for all threads to complete and collect results
    for (int i = 0; i < NUM_THREADS; i++) {
        void* thread_result;
        pthread_join(threads[i], &thread_result);
        
        if (thread_result != NULL) {
            int* result_value = (int*)thread_result;
            printf("Thread %d returned: %d\\n", i + 1, *result_value);
            free(result_value);
        }
    }
    
    // Demonstrate shared data (not thread-safe - for educational purposes)
    printf("\\nShared counter example:\\n");
    int shared_counter = 0;
    pthread_t counter_thread_id;
    
    pthread_create(&counter_thread_id, NULL, counter_thread, &shared_counter);
    pthread_join(counter_thread_id, NULL);
    
    printf("Final counter value: %d\\n", shared_counter);
    printf("All threads completed\\n");
    
    return 0;
}`
  },
  {
    id: 'network-client',
    title: 'Simple Network Client',
    description: 'Basic TCP client using sockets',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['networking', 'sockets', 'TCP/IP'],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int create_socket() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("Socket creation failed");
        return -1;
    }
    return sock;
}

int connect_to_server(int sock, const char* server_ip) {
    struct sockaddr_in server_addr;
    
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    
    if (inet_pton(AF_INET, server_ip, &server_addr.sin_addr) <= 0) {
        printf("Invalid address/ Address not supported\\n");
        return -1;
    }
    
    if (connect(sock, (struct sockaddr*)&server_addr, sizeof(server_addr)) < 0) {
        perror("Connection failed");
        return -1;
    }
    
    printf("Connected to server %s:%d\\n", server_ip, PORT);
    return 0;
}

void send_message(int sock, const char* message) {
    ssize_t bytes_sent = send(sock, message, strlen(message), 0);
    if (bytes_sent < 0) {
        perror("Send failed");
    } else {
        printf("Sent %zd bytes: %s\\n", bytes_sent, message);
    }
}

void receive_message(int sock) {
    char buffer[BUFFER_SIZE] = {0};
    ssize_t bytes_received = recv(sock, buffer, BUFFER_SIZE - 1, 0);
    
    if (bytes_received < 0) {
        perror("Receive failed");
    } else if (bytes_received == 0) {
        printf("Server closed connection\\n");
    } else {
        buffer[bytes_received] = '\\0';
        printf("Received %zd bytes: %s\\n", bytes_received, buffer);
    }
}

int main() {
    const char* server_ip = "127.0.0.1";  // localhost
    
    printf("TCP Client Demo\\n");
    printf("Attempting to connect to %s:%d\\n", server_ip, PORT);
    
    int sock = create_socket();
    if (sock < 0) {
        return 1;
    }
    
    if (connect_to_server(sock, server_ip) < 0) {
        close(sock);
        printf("Note: This demo requires a server running on %s:%d\\n", server_ip, PORT);
        printf("You can test with: nc -l %d\\n", PORT);
        return 1;
    }
    
    // Send some messages
    send_message(sock, "Hello, Server!");
    send_message(sock, "This is a test message");
    send_message(sock, "Goodbye!");
    
    // Try to receive responses
    printf("\\nListening for responses...\\n");
    for (int i = 0; i < 3; i++) {
        receive_message(sock);
    }
    
    close(sock);
    printf("Connection closed\\n");
    
    return 0;
}`
  },
  {
    id: 'regex-matching',
    title: 'Regular Expression Matching',
    description: 'Simple regex pattern matching implementation',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['pattern matching', 'regular expressions', 'string algorithms'],
    code: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool matchChar(char pattern, char text) {
    return pattern == '.' || pattern == text;
}

bool matchStar(char star_char, char* pattern, char* text) {
    // Try matching zero occurrences
    if (matchPattern(pattern, text)) {
        return true;
    }
    
    // Try matching one or more occurrences
    while (*text && matchChar(star_char, *text)) {
        text++;
        if (matchPattern(pattern, text)) {
            return true;
        }
    }
    
    return false;
}

bool matchPattern(char* pattern, char* text) {
    // Base case: empty pattern
    if (*pattern == '\\0') {
        return *text == '\\0';
    }
    
    // Check for star operator
    if (*(pattern + 1) == '*') {
        return matchStar(*pattern, pattern + 2, text);
    }
    
    // Regular character matching
    if (*text && matchChar(*pattern, *text)) {
        return matchPattern(pattern + 1, text + 1);
    }
    
    return false;
}

bool regexMatch(char* text, char* pattern) {
    // Try matching at each position in text
    do {
        if (matchPattern(pattern, text)) {
            return true;
        }
    } while (*text++);
    
    return false;
}

void testRegex(char* text, char* pattern) {
    bool result = regexMatch(text, pattern);
    printf("Text: %-20s Pattern: %-15s Result: %s\\n", 
           text, pattern, result ? "MATCH" : "NO MATCH");
}

int main() {
    printf("Simple Regular Expression Matcher\\n");
    printf("Supports: . (any char), * (zero or more)\\n\\n");
    
    // Test cases
    testRegex("hello", "hello");           // Exact match
    testRegex("hello", "h.llo");           // Dot wildcard
    testRegex("hello", "he*llo");          // Star quantifier
    testRegex("heeello", "he*llo");        // Multiple e's
    testRegex("hllo", "he*llo");           // Zero e's
    testRegex("hello world", "hello.*");   // Match prefix
    testRegex("abc", "a.c");               // Single char wildcard
    testRegex("ac", "a.c");                // Should not match
    testRegex("aaaaab", "a*b");            // Multiple a's followed by b
    testRegex("b", "a*b");                 // Zero a's followed by b
    testRegex("", "a*");                   // Empty string with star
    testRegex("programming", "prog.*ing"); // Complex pattern
    
    printf("\\nInteractive test (enter 'quit' to exit):\\n");
    char text[100], pattern[100];
    
    while (1) {
        printf("Enter text: ");
        if (fgets(text, sizeof(text), stdin) == NULL) break;
        text[strcspn(text, "\\n")] = 0;  // Remove newline
        
        if (strcmp(text, "quit") == 0) break;
        
        printf("Enter pattern: ");
        if (fgets(pattern, sizeof(pattern), stdin) == NULL) break;
        pattern[strcspn(pattern, "\\n")] = 0;  // Remove newline
        
        testRegex(text, pattern);
        printf("\\n");
    }
    
    return 0;
}`
  },
  {
    id: 'compression-algorithm',
    title: 'Simple Compression Algorithm',
    description: 'Run-length encoding compression implementation',
    language: 'c',
    difficulty: 'advanced',
    concepts: ['compression', 'algorithms', 'data encoding'],
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char* data;
    size_t length;
    size_t capacity;
} Buffer;

Buffer* createBuffer(size_t initial_capacity) {
    Buffer* buffer = malloc(sizeof(Buffer));
    buffer->data = malloc(initial_capacity);
    buffer->length = 0;
    buffer->capacity = initial_capacity;
    return buffer;
}

void appendToBuffer(Buffer* buffer, char c) {
    if (buffer->length >= buffer->capacity) {
        buffer->capacity *= 2;
        buffer->data = realloc(buffer->data, buffer->capacity);
    }
    buffer->data[buffer->length++] = c;
}

void freeBuffer(Buffer* buffer) {
    free(buffer->data);
    free(buffer);
}

Buffer* compress(const char* input) {
    Buffer* compressed = createBuffer(strlen(input));
    
    if (strlen(input) == 0) {
        return compressed;
    }
    
    char current_char = input[0];
    int count = 1;
    
    for (size_t i = 1; i <= strlen(input); i++) {
        if (i < strlen(input) && input[i] == current_char && count < 255) {
            count++;
        } else {
            // Write count and character
            appendToBuffer(compressed, (char)count);
            appendToBuffer(compressed, current_char);
            
            if (i < strlen(input)) {
                current_char = input[i];
                count = 1;
            }
        }
    }
    
    return compressed;
}

char* decompress(Buffer* compressed) {
    if (compressed->length % 2 != 0) {
        printf("Error: Invalid compressed data\\n");
        return NULL;
    }
    
    size_t output_size = 0;
    
    // Calculate output size
    for (size_t i = 0; i < compressed->length; i += 2) {
        output_size += (unsigned char)compressed->data[i];
    }
    
    char* output = malloc(output_size + 1);
    size_t output_pos = 0;
    
    // Decompress
    for (size_t i = 0; i < compressed->length; i += 2) {
        unsigned char count = (unsigned char)compressed->data[i];
        char character = compressed->data[i + 1];
        
        for (int j = 0; j < count; j++) {
            output[output_pos++] = character;
        }
    }
    
    output[output_size] = '\\0';
    return output;
}

void printBuffer(Buffer* buffer, const char* label) {
    printf("%s (length: %zu): ", label, buffer->length);
    for (size_t i = 0; i < buffer->length; i += 2) {
        if (i + 1 < buffer->length) {
            printf("%d%c ", (unsigned char)buffer->data[i], buffer->data[i + 1]);
        }
    }
    printf("\\n");
}

double calculateCompressionRatio(size_t original, size_t compressed) {
    if (original == 0) return 0.0;
    return (double)compressed / original * 100.0;
}

int main() {
    const char* test_strings[] = {
        "aaabbbcccdddeeefffggghhhiiijjjkkklllmmmnnnooopppqqqrrrssstttuuuvvvwwwxxxyyyzzz",
        "aaaaaaaaaaaaaaaaaaaaaaaa",
        "abcdefghijklmnopqrstuvwxyz",
        "aaabbbaaacccaaadddaaa",
        "hello world",
        "aabbccddee",
        ""
    };
    
    int num_tests = sizeof(test_strings) / sizeof(test_strings[0]);
    
    printf("Run-Length Encoding Compression Demo\\n");
    printf("=====================================\\n\\n");
    
    for (int i = 0; i < num_tests; i++) {
        const char* original = test_strings[i];
        printf("Test %d:\\n", i + 1);
        printf("Original: \\"%s\\" (length: %zu)\\n", original, strlen(original));
        
        Buffer* compressed = compress(original);
        printBuffer(compressed, "Compressed");
        
        char* decompressed = decompress(compressed);
        if (decompressed) {
            printf("Decompressed: \\"%s\\" (length: %zu)\\n", decompressed, strlen(decompressed));
            
            // Verify correctness
            if (strcmp(original, decompressed) == 0) {
                printf("✓ Compression/decompression successful\\n");
            } else {
                printf("✗ Error: Decompressed data doesn't match original\\n");
            }
            
            double ratio = calculateCompressionRatio(strlen(original), compressed->length);
            printf("Compression ratio: %.1f%%\\n", ratio);
            
            if (ratio < 100.0) {
                printf("Space saved: %.1f%%\\n", 100.0 - ratio);
            } else {
                printf("No space saved (data expanded)\\n");
            }
            
            free(decompressed);
        }
        
        freeBuffer(compressed);
        printf("\\n");
    }
    
    return 0;
}`
  }
];

export function getRandomSample(): CodeSample {
  const randomIndex = Math.floor(Math.random() * CODE_SAMPLES.length);
  return CODE_SAMPLES[randomIndex];
}

export function getSampleById(id: string): CodeSample | undefined {
  return CODE_SAMPLES.find(sample => sample.id === id);
}

export function getSamplesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): CodeSample[] {
  return CODE_SAMPLES.filter(sample => sample.difficulty === difficulty);
}

export function getSamplesByConcept(concept: string): CodeSample[] {
  return CODE_SAMPLES.filter(sample => 
    sample.concepts.some(c => c.toLowerCase().includes(concept.toLowerCase()))
  );
}