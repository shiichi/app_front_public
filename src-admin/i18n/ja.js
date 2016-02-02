/*eslint-disable max-len,quotes*/
export default {
  "user": "ユーザー",
  "role": "ロール",
  "permission": "パーミッション",
  "sideAlert.success": `{attribute, plural,
  	=user {ユーザー} =role {ロール} =permission {パーミッション}}{method, plural,
  	=activate {の停止を解除} =deactivate {を停止} =restore{を復旧} =destroy{を削除} =delete{を完全に削除}}しました`,
  "sideAlert.fail":`{attribute, plural,
  	=user {ユーザー} =role {ロール} =permission {パーミッション}}{method, plural,
  	=activate {の停止解除} =deactivate {の停止} =restore{の復旧} =destroy{の削除} =delete{の完全削除}}に失敗しました　もう一度実行してください`,
}