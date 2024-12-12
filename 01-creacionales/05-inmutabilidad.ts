/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
    readonly content: string;
    readonly cursosPosition: number;
    readonly unsavedChanger: boolean;

    constructor(content: string, cursorPosition: number, unsavedChanges: boolean) {
        this.content = content;
        this.cursosPosition = cursorPosition;
        this.unsavedChanger = unsavedChanges;
    }

    copyWith({
        content,
        cursosPosition,
        unsavedChanger
    }: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursosPosition ?? this.cursosPosition,
            unsavedChanger ?? this.unsavedChanger
        )
    }

    displayState() {
        console.log('\n%cEstado del editor:', COLORS.green);
        console.log(`
            Contenido: ${this.content}
            Cursor Pos: ${this.cursosPosition}
            Unsaved changes: ${this.unsavedChanger}
        `);
    }
}

class CodeEditorHistory {
    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;

    save(state: CodeEditorState): void {
        if(this.currentIndex < this.history.length - 1) {
            this.history = this.history.splice(0, this.currentIndex + 1)
        }
        this.history.push(state);
        this.currentIndex++;
    }

    undo(): CodeEditorState | null {
        if(this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    redo(): CodeEditorState | null {
        if(this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }

        return null;
    }
}

function main() {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState(
        "console.log('Hola mundo')",
        2,
        false
    );

    history.save(editorState);

    console.log('%cEstado inicial: ', COLORS.blue);
    editorState.displayState();
    
    editorState = editorState.copyWith({
        content: "console.log('Hola Mundo'; \nconsole.log('Nueva linea'))",
        cursosPosition: 3,
        unsavedChanger: true
    })

    history.save(editorState);

    console.log('%c\nDespues del primer cambio: ', COLORS.blue);
    editorState.displayState();

    editorState = editorState.copyWith({ cursosPosition: 5});
    history.save(editorState);

    console.log('%c\nDespues de mover el cursos: ', COLORS.blue);
    editorState.displayState();

    console.log('%c\nDespues del undo: ', COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();

    console.log('%c\nDespues del redo: ', COLORS.blue);
    editorState = history.redo()!;
    editorState.displayState();
}

main();